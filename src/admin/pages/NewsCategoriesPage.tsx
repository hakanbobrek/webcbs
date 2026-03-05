import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Plus, Trash2, Edit2, GripVertical, Save, X } from 'lucide-react';

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}

const SortableItem = ({ item, onEdit, onDelete }: { item: NewsCategory; onEdit: (item: NewsCategory) => void; onDelete: (id: number) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-3 group">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:border-mosk-orange/50 transition-colors">
        <div className="flex items-center gap-4">
          <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-mosk-orange active:cursor-grabbing p-1">
            <GripVertical size={20} />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">/{item.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Düzenle"
          >
            <Edit2 size={20} />
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Sil"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsCategoriesPage = () => {
  const [items, setItems] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<NewsCategory | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/news-categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Kategoriler yüklenemedi.');
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Save order
        const updates = newItems.map((item, index) => ({
          id: item.id,
          order: index
        }));
        
        const token = localStorage.getItem('adminToken');
        axios.put('http://localhost:3001/api/news-categories/reorder', { items: updates }, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => toast.error('Sıralama kaydedilemedi.'));

        return newItems;
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/news-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Kategori silindi!');
      fetchCategories();
    } catch (error) {
      toast.error('Silme işlemi başarısız.');
    }
  };

  const handleEdit = (item: NewsCategory) => {
    setEditItem(item);
    setFormData({ name: item.name, slug: item.slug });
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
      
    setFormData({ name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editItem) {
        await axios.put(`http://localhost:3001/api/news-categories/${editItem.id}`, formData, config);
        toast.success('Kategori güncellendi!');
      } else {
        await axios.post('http://localhost:3001/api/news-categories', formData, config);
        toast.success('Kategori oluşturuldu!');
      }
      
      setIsEditing(false);
      setEditItem(null);
      setFormData({ name: '', slug: '' });
      fetchCategories();
    } catch (error) {
      toast.error('Kaydetme işlemi başarısız.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Haber Kategorileri</h1>
        <button 
          onClick={() => {
            setIsEditing(true);
            setEditItem(null);
            setFormData({ name: '', slug: '' });
          }}
          className="flex items-center px-4 py-2 bg-mosk-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Kategori Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <DndContext 
              sensors={sensors} 
              collisionDetection={closestCenter} 
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={items.map(i => i.id)} 
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <SortableItem 
                    key={item.id} 
                    item={item} 
                    onEdit={handleEdit}
                    onDelete={handleDelete} 
                  />
                ))}
              </SortableContext>
            </DndContext>
            
            {items.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Henüz kategori eklenmemiş.
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {editItem ? 'Kategori Düzenle' : 'Yeni Kategori'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Kategori Adı
                  </label>
                  <input 
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange"
                    placeholder="Örn: Teknoloji"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug
                  </label>
                  <input 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    İptal
                  </button>
                  <button 
                    type="submit"
                    className="flex items-center px-4 py-2 text-sm bg-mosk-orange text-white rounded-lg hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                  >
                    <Save size={16} className="mr-2" />
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default NewsCategoriesPage;
