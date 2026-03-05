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
import { Plus, Trash2, Edit2, GripVertical, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SocialMediaPost {
  id: number;
  title: string;
  order: number;
  platform: 'LINKEDIN' | 'INSTAGRAM';
  categories: { id: number; name: string }[];
}

const SortableItem = ({ item, onDelete }: { item: SocialMediaPost; onDelete: (id: number) => void }) => {
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
          
          <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border ${
            item.platform === 'LINKEDIN' 
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800' 
              : 'bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-800'
          }`}>
            {item.platform === 'LINKEDIN' ? (
              <Linkedin size={32} className="text-[#0077b5]" />
            ) : (
              <Instagram size={32} className="text-pink-600" />
            )}
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-lg">{item.title || 'Başlıksız Gönderi'}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                item.platform === 'LINKEDIN' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                  : 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300'
              }`}>
                {item.platform}
              </span>
              {item.categories.map((cat) => (
                <span key={cat.id} className="text-xs px-2 py-0.5 bg-mosk-orange/10 text-mosk-orange rounded-full">
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link 
            to={`/admin/social-media/edit/${item.id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Düzenle"
          >
            <Edit2 size={20} />
          </Link>
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

import ConfirmModal from '../components/ConfirmModal';

const SocialMediaPostsPage = () => {
  const [items, setItems] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/social-media-posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Gönderiler yüklenemedi.');
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
        axios.put('http://localhost:3001/api/social-media-posts/reorder', { items: updates }, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => toast.error('Sıralama kaydedilemedi.'));

        return newItems;
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/social-media-posts/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Gönderi silindi!');
      fetchPosts();
    } catch (error) {
      toast.error('Silme işlemi başarısız.');
    }
    setDeleteId(null);
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sosyal Medya Gönderileri</h1>
        <Link 
          to="/admin/linkedin/new"
          className="flex items-center px-4 py-2 bg-mosk-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Gönderi Ekle
        </Link>
      </div>

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
                onDelete={(id) => setDeleteId(id)} 
              />
            ))}
          </SortableContext>
        </DndContext>
        
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Henüz gönderi eklenmemiş. "Yeni Gönderi Ekle" butonu ile başlayın.
          </div>
        )}
      </div>
      
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Gönderiyi Sil"
        message="Bu gönderiyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SocialMediaPostsPage;
