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
import { Plus, Trash2, Edit2, Save, X, GripVertical, ChevronRight, ChevronDown, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface MenuItem {
  id: number;
  title: string;
  slug: string;
  url?: string;
  icon?: string;
  order: number;
  parentId: number | null;
  children?: MenuItem[];
}

const ICON_OPTIONS = [
  'Home', 'User', 'Settings', 'Phone', 'Mail', 
  'FileText', 'Globe', 'Link', 'Share2', 'Info', 
  'HelpCircle', 'Layers', 'Layout', 'List', 'Menu', 
  'Search', 'Star', 'Tag', 'Tool', 'Briefcase',
  'MapPin', 'MessageCircle', 'ShoppingBag', 'CreditCard',
  'Calendar', 'Camera', 'Check', 'Cloud', 'Database',
  'Download', 'Edit', 'Eye', 'File', 'Filter',
  'Folder', 'Heart', 'Image', 'Inbox', 'Lock',
  'Music', 'Navigation', 'Package', 'Paperclip', 'PieChart',
  'Printer', 'Save', 'Send', 'Server', 'Shield',
  'Smartphone', 'Smile', 'Speaker', 'Tablet', 'Terminal',
  'Trash', 'Truck', 'Upload', 'Video', 'Wifi', 'Zap'
];

const DynamicIcon = ({ name, size = 18, className }: { name: string; size?: number; className?: string }) => {
  if (!name) return null;
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as any)[iconName];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
};

const SortableItem = ({ item, onEdit, onDelete, level = 0 }: { item: MenuItem; onEdit: (item: MenuItem) => void; onDelete: (id: number) => void; level?: number }) => {
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
    marginLeft: `${level * 24}px`,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2 group">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:border-mosk-orange/50 transition-colors">
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-mosk-orange active:cursor-grabbing">
            <GripVertical size={20} />
          </div>
          <div className="flex items-center gap-3">
            {item.icon && (
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-mosk-orange">
                <DynamicIcon name={item.icon} size={20} />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                {item.title}
                {item.url && <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Harici Link</span>}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">/{item.slug}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Düzenle"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Sil"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    url: '',
    icon: '',
    parentId: '' as string | number
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/menus');
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Menüler yüklenemedi.');
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    // Note: This only handles visual reordering within the same SortableContext
    // Since we use separate contexts for each group, dragging between groups is not supported by this simple implementation
    // But reordering siblings works.
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      // Find the group this item belongs to
      // We need to know parentId of the dragged item
      const draggedItem = items.find(i => i.id === active.id);
      if (!draggedItem) return;
      
      const parentId = draggedItem.parentId;
      const groupItems = getItemsByParent(parentId);
      
      const oldIndex = groupItems.findIndex((i) => i.id === active.id);
      const newIndex = groupItems.findIndex((i) => i.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newGroup = arrayMove(groupItems, oldIndex, newIndex);
        
        // Optimistic update for UI
        // We need to construct new full list
        const otherItems = items.filter(i => i.parentId !== parentId);
        // We need to update orders of newGroup
        const updatedGroup = newGroup.map((item, idx) => ({ ...item, order: idx }));
        
        setItems([...otherItems, ...updatedGroup]);
        
        // Save to backend
        await handleSaveOrder(updatedGroup);
      }
    }
  };

  const getItemsByParent = (parentId: number | null) => {
    return items.filter(i => i.parentId === parentId).sort((a, b) => a.order - b.order);
  };

  const handleSaveOrder = async (sortedItems: MenuItem[]) => {
    try {
      const updates = sortedItems.map((item, index) => ({
        id: item.id,
        order: index,
        parentId: item.parentId
      }));
      
      const token = localStorage.getItem('adminToken');
      await axios.put('http://localhost:3001/api/menus/reorder', { items: updates }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      toast.error('Sıralama kaydedilemedi.');
    }
  };

  const onDragEndGroup = (parentId: number | null) => async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const currentGroup = getItemsByParent(parentId);
      const oldIndex = currentGroup.findIndex((i) => i.id === active.id);
      const newIndex = currentGroup.findIndex((i) => i.id === over.id);
      
      const newGroup = arrayMove(currentGroup, oldIndex, newIndex);
      
      // Update local state first
      const updatedGroup = newGroup.map((item, idx) => ({ ...item, order: idx }));
      const otherItems = items.filter(i => i.parentId !== parentId);
      setItems([...otherItems, ...updatedGroup]);
      
      // Save
      await handleSaveOrder(updatedGroup);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        parentId: formData.parentId ? Number(formData.parentId) : null
      };

      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingItem) {
        await axios.put(`http://localhost:3001/api/menus/${editingItem.id}`, payload, config);
        toast.success('Menü güncellendi!');
      } else {
        await axios.post('http://localhost:3001/api/menus', payload, config);
        toast.success('Menü eklendi!');
      }
      setIsModalOpen(false);
      fetchMenus();
      resetForm();
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Yetkiniz yok. Lütfen tekrar giriş yapın.');
      } else {
        toast.error('İşlem başarısız.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu menüyü silmek istediğinizden emin misiniz?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/menus/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Menü silindi!');
      fetchMenus();
    } catch (error) {
      toast.error('Silme işlemi başarısız.');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', slug: '', url: '', icon: '', parentId: '' });
    setEditingItem(null);
    setShowIconPicker(false);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      url: item.url || '',
      icon: item.icon || '',
      parentId: item.parentId || ''
    });
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Slugify: Turkish chars to English, remove special, space to dash
    const slug = title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
      
    setFormData(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  // Filter icons
  const filteredIcons = ICON_OPTIONS.filter(icon => 
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const renderGroup = (parentId: number | null, level = 0) => {
    const groupItems = getItemsByParent(parentId);
    if (groupItems.length === 0) return null;

    return (
      <div className={`ml-${level * 4}`}>
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={onDragEndGroup(parentId)}
          id={`dnd-context-${parentId || 'root'}`}
        >
          <SortableContext 
            items={groupItems.map(i => i.id)} 
            strategy={verticalListSortingStrategy}
            id={`sortable-context-${parentId || 'root'}`}
          >
            {groupItems.map((item) => (
              <div key={item.id}>
                <SortableItem 
                  item={item} 
                  onEdit={openEdit} 
                  onDelete={handleDelete} 
                  level={level}
                />
                {renderGroup(item.id, level + 1)}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menü Yönetimi</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center px-4 py-2 bg-mosk-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Menü Ekle
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Henüz menü eklenmemiş. "Yeni Menü Ekle" butonu ile başlayın.
          </div>
        ) : (
          renderGroup(null)
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingItem ? 'Menü Düzenle' : 'Yeni Menü Ekle'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Başlık</label>
                <input 
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange focus:border-transparent outline-none"
                  placeholder="Örn: Hakkımızda"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug (Otomatik Oluşturulur)
                </label>
                <input 
                  value={formData.slug}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Bu alan başlığa göre otomatik doldurulur.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">İkon</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {formData.icon ? (
                        <>
                          <DynamicIcon name={formData.icon} />
                          <span>{formData.icon}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">İkon Seçiniz...</span>
                      )}
                    </div>
                    <ChevronDown size={16} />
                  </button>

                  {showIconPicker && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-20 max-h-60 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                          <input 
                            value={iconSearch}
                            onChange={(e) => setIconSearch(e.target.value)}
                            placeholder="İkon ara..."
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-2 grid grid-cols-5 gap-2">
                        {filteredIcons.map(iconName => (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, icon: iconName });
                              setShowIconPicker(false);
                            }}
                            className={`p-2 rounded-md flex flex-col items-center justify-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${formData.icon === iconName ? 'bg-mosk-orange/10 text-mosk-orange border border-mosk-orange/20' : 'text-gray-600 dark:text-gray-400'}`}
                            title={iconName}
                          >
                            <DynamicIcon name={iconName} size={20} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Üst Menü</label>
                <select 
                  value={formData.parentId}
                  onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">-- Ana Menü --</option>
                  {items.filter(i => i.id !== editingItem?.id).map(item => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Özel URL (Opsiyonel)</label>
                <input 
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://... (Sadece harici linkler için)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-mosk-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 font-medium"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default MenuPage;
