import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Save, Image as ImageIcon, Trash2, ChevronDown, Layout, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Icon options (same as before)
const ICON_OPTIONS = [
  'Activity', 'Award', 'BarChart', 'Box', 'Briefcase', 'Camera', 'Check', 'Circle', 
  'Cloud', 'Code', 'Compass', 'Cpu', 'Database', 'Disc', 'Droplet', 'Eye', 'File', 
  'Filter', 'Flag', 'Folder', 'Globe', 'Grid', 'HardDrive', 'Hash', 'Headphones', 
  'Heart', 'Home', 'Image', 'Inbox', 'Info', 'Key', 'Layers', 'Layout', 'LifeBuoy', 
  'Link', 'List', 'Lock', 'Map', 'MapPin', 'Maximize', 'Menu', 'MessageCircle', 
  'Mic', 'Monitor', 'Moon', 'Music', 'Navigation', 'Package', 'Paperclip', 'PenTool', 
  'Percent', 'Phone', 'PieChart', 'Play', 'Plus', 'Power', 'Printer', 'Radio', 
  'RefreshCw', 'Save', 'Scissors', 'Search', 'Send', 'Server', 'Settings', 'Share', 
  'Shield', 'ShoppingBag', 'ShoppingCart', 'Shuffle', 'Sidebar', 'Smartphone', 'Smile', 
  'Speaker', 'Star', 'StopCircle', 'Sun', 'Sunrise', 'Sunset', 'Tablet', 'Tag', 
  'Target', 'Terminal', 'Thermometer', 'ThumbsUp', 'ToggleLeft', 'ToggleRight', 'Tool', 
  'Trash', 'Truck', 'Tv', 'Twitter', 'Type', 'Umbrella', 'Upload', 'User', 'Users', 
  'Video', 'Voicemail', 'Volume', 'Volume1', 'Volume2', 'VolumeX', 'Watch', 'Wifi', 
  'Wind', 'X', 'Youtube', 'Zap', 'ZoomIn', 'ZoomOut'
];

const DynamicIcon = ({ name, size = 18, className }: { name: string; size?: number; className?: string }) => {
  if (!name) return null;
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as any)[iconName];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
};

const ServiceEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [uploading, setUploading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    shortDescription: '',
    slug: '',
    icon: '',
    bgImage: '',
    content: '',
    features: '',
    language: 'tr'
  });

  useEffect(() => {
    if (isEditing) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // We can use the public endpoint for details or admin list and find. 
      // Ideally an admin endpoint for single service detail is better but public slug works if unique.
      // However, we have ID here. Let's assume we can fetch by ID or filter from list.
      // Since we don't have a direct "get by id" endpoint in index.js (except for update/delete), 
      // let's fetch all admin services and find.
      const res = await axios.get('http://localhost:3001/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const service = res.data.find((s: any) => s.id === parseInt(id!));
      
      if (service) {
        setFormData({
          title: service.title,
          shortTitle: service.shortTitle || '',
          shortDescription: service.shortDescription || '',
          slug: service.slug,
          icon: service.icon || '',
          bgImage: service.bgImage || '',
          content: service.content || '',
          features: service.features.join(', '),
          language: service.language
        });
      } else {
        toast.error('Hizmet bulunamadı.');
        navigate('/admin/services');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Hizmet yüklenirken hata oluştu.');
      navigate('/admin/services');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
      
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('http://localhost:3001/api/upload/service', formDataUpload, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setFormData(prev => ({ ...prev, bgImage: res.data.url }));
      toast.success('Görsel yüklendi!');
    } catch (error) {
      toast.error('Görsel yüklenemedi.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (isEditing) {
        await axios.put(`http://localhost:3001/api/services/${id}`, payload, config);
        toast.success('Hizmet başarıyla güncellendi!');
      } else {
        await axios.post('http://localhost:3001/api/services', payload, config);
        toast.success('Hizmet başarıyla oluşturuldu!');
      }
      
      // Delay navigation slightly to show toast
      setTimeout(() => navigate('/admin/services'), 1000);
    } catch (error) {
      toast.error('Kaydetme işlemi başarısız.');
    }
  };

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Hizmet detaylarını buraya yazın...',
    height: 500,
    uploader: {
      insertImageAsBase64URI: true
    },
    language: 'tr',
    toolbarButtonSize: 'middle' as 'middle',
    buttons: [
      'source', '|',
      'bold', 'strikethrough', 'underline', 'italic', '|',
      'ul', 'ol', '|',
      'outdent', 'indent',  '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'video', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'fullsize', 'preview', 'print'
    ]
  }), []);

  const filteredIcons = ICON_OPTIONS.filter(icon => 
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/services')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/admin/services')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-mosk-orange hover:bg-orange-600 rounded-lg shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
              >
                <Save size={18} />
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hizmet Başlığı
                  </label>
                  <input 
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange transition-all"
                    placeholder="Hizmet Adı Giriniz"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Slug (URL Bağlantısı)
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span>moskbilisim.com/services/</span>
                    <span className="text-gray-900 dark:text-white font-medium">{formData.slug}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col min-h-[600px]">
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-medium">
                <Layout size={20} className="text-mosk-orange" />
                <h2>Sayfa İçeriği</h2>
              </div>
              <div className="flex-1 bg-white rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <JoditEditor
                  value={formData.content}
                  config={config}
                  onBlur={(newContent) => setFormData({...formData, content: newContent})}
                />
              </div>
            </div>
          </div>

          {/* Settings Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Status & Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ayarlar</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dil</label>
                  <select 
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kısa Başlık (Kartlar İçin)</label>
                  <input 
                    value={formData.shortTitle}
                    onChange={(e) => setFormData({...formData, shortTitle: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Örn: CBS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kısa Açıklama (Özet)</label>
                  <textarea 
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white h-24 resize-none"
                    placeholder="Listeleme sayfalarında görünecek özet..."
                  />
                </div>
              </div>
            </div>

            {/* Icon & Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Görseller</h3>
              
              <div className="space-y-4">
                {/* Icon Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">İkon</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowIconPicker(!showIconPicker)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {formData.icon ? (
                          <>
                            <div className="text-mosk-orange">
                              <DynamicIcon name={formData.icon} />
                            </div>
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
                        <div className="p-2 border-b border-gray-200 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-800">
                          <div className="relative">
                            <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
                            <input 
                              value={iconSearch}
                              onChange={(e) => setIconSearch(e.target.value)}
                              placeholder="İkon ara..."
                              className="w-full pl-8 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                              className={`p-2 rounded-md flex flex-col items-center justify-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors aspect-square ${formData.icon === iconName ? 'bg-mosk-orange/10 text-mosk-orange ring-1 ring-mosk-orange' : 'text-gray-600 dark:text-gray-400'}`}
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

                {/* Feature Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kapak Görseli</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-mosk-orange transition-colors relative group">
                    {formData.bgImage ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img src={formData.bgImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            type="button"
                            onClick={() => setFormData({...formData, bgImage: ''})}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4">
                        <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                      </div>
                    )}
                    {!formData.bgImage && (
                      <>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="bg-image-upload"
                          disabled={uploading}
                        />
                        <label 
                          htmlFor="bg-image-upload" 
                          className="absolute inset-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                  {uploading && <p className="text-xs text-mosk-orange mt-1">Yükleniyor...</p>}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Özellikler</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maddeler (Virgülle ayırın)
                </label>
                <textarea 
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white h-32 resize-none"
                  placeholder="Örn: Hızlı Entegrasyon, Güvenli Altyapı, 7/24 Destek"
                />
                <p className="text-xs text-gray-500 mt-2">Bu özellikler detay sayfasında yan menüde listelenir.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ServiceEditorPage;
