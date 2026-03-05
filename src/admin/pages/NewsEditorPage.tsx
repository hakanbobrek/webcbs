import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Save, Image as ImageIcon, Trash2, Layout } from 'lucide-react';

interface NewsCategory {
  id: number;
  name: string;
}

const NewsEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<NewsCategory[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    slug: '',
    bgImage: '',
    content: '',
    features: '',
    language: 'tr',
    publishedAt: new Date().toISOString().split('T')[0],
    categoryIds: [] as number[],
    galleryImages: [] as string[]
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchNews();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/news-categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (error) {
      console.error('Kategoriler yüklenemedi:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/admin/news', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newsItem = res.data.find((s: any) => s.id === parseInt(id!));
      
      if (newsItem) {
        setFormData({
          title: newsItem.title,
          shortDescription: newsItem.shortDescription || '',
          slug: newsItem.slug,
          bgImage: newsItem.bgImage || '',
          content: newsItem.content || '',
          features: newsItem.features ? (Array.isArray(newsItem.features) ? newsItem.features.join(', ') : newsItem.features) : '',
          language: newsItem.language,
          publishedAt: newsItem.publishedAt ? new Date(newsItem.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          categoryIds: newsItem.categories ? newsItem.categories.map((c: any) => c.id) : [],
          galleryImages: newsItem.images ? newsItem.images.map((img: any) => img.url) : []
        });
      } else {
        toast.error('Haber bulunamadı.');
        navigate('/admin/news');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Haber yüklenirken hata oluştu.');
      navigate('/admin/news');
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData(prev => {
      const isSelected = prev.categoryIds.includes(categoryId);
      if (isSelected) {
        return { ...prev, categoryIds: prev.categoryIds.filter(id => id !== categoryId) };
      } else {
        return { ...prev, categoryIds: [...prev.categoryIds, categoryId] };
      }
    });
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const token = localStorage.getItem('adminToken');

    try {
      if (isGallery) {
        // Handle multiple files for gallery
        const uploadedUrls: string[] = [];
        
        // Loop through each file and upload
        for (let i = 0; i < files.length; i++) {
          const formDataUpload = new FormData();
          formDataUpload.append('file', files[i]);
          
          const res = await axios.post('http://localhost:3001/api/upload/news', formDataUpload, {
            headers: { 
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          });
          uploadedUrls.push(res.data.url);
        }
        
        setFormData(prev => ({ 
          ...prev, 
          galleryImages: [...(prev.galleryImages || []), ...uploadedUrls] 
        }));
        toast.success(`${uploadedUrls.length} görsel galeriye eklendi!`);
        
      } else {
        // Handle single file for cover image
        const file = files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        const res = await axios.post('http://localhost:3001/api/upload/news', formDataUpload, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(prev => ({ ...prev, bgImage: res.data.url }));
        toast.success('Kapak görseli yüklendi!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Görsel yüklenemedi.');
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Since News schema features is String[]? No, I defined it as String[]? Wait, I didn't define features in News schema.
      // Ah, I missed 'features' in the News schema I wrote earlier!
      // Let me check the schema write I did.
      // I wrote: 
      // model News { ... shortDescription String?, content String?, bgImage String?, publishedAt DateTime ... }
      // I did NOT add features String[] to News model.
      // But user said "hizmetlerdeki özellikler olacak".
      // I missed adding features to News model in schema.prisma.
      // I need to fix schema.prisma first!
      
      const payload = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (isEditing) {
        await axios.put(`http://localhost:3001/api/news/${id}`, payload, config);
        toast.success('Haber başarıyla güncellendi!');
      } else {
        await axios.post('http://localhost:3001/api/news', payload, config);
        toast.success('Haber başarıyla oluşturuldu!');
      }
      
      setTimeout(() => navigate('/admin/news'), 1000);
    } catch (error) {
      toast.error('Kaydetme işlemi başarısız.');
      console.error(error);
    }
  };

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Haber detaylarını buraya yazın...',
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

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/news')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/admin/news')}
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
                    Haber Başlığı
                  </label>
                  <input 
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange transition-all"
                    placeholder="Haber Başlığı Giriniz"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Slug (URL Bağlantısı)
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span>moskbilisim.com/news/</span>
                    <span className="text-gray-900 dark:text-white font-medium">{formData.slug}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col min-h-[600px]">
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-medium">
                <Layout size={20} className="text-mosk-orange" />
                <h2>Haber İçeriği</h2>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Yayın Tarihi</label>
                  <input 
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({...formData, publishedAt: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kısa Açıklama (Özet)</label>
                  <textarea 
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white h-24 resize-none"
                    placeholder="Haber listesinde görünecek özet..."
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kapak Görseli</h3>
              
              <div className="space-y-4">
                <div>
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
                          onChange={(e) => handleFileUpload(e, false)}
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

            {/* Gallery Images */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Haber Galerisi</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {formData.galleryImages?.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Upload Button */}
                  <div className="relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-mosk-orange hover:text-mosk-orange transition-colors cursor-pointer">
                    <ImageIcon size={24} className="mb-1" />
                    <span className="text-xs font-medium">Ekle</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e, true)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Birden fazla görsel seçebilirsiniz.</p>
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
                  placeholder="Örn: Önemli Gelişme, Yeni Teknoloji"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kategoriler</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Bu haberin ait olduğu kategorileri seçin (Birden fazla seçilebilir).
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <label 
                    key={category.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.categoryIds.includes(category.id)
                        ? 'border-mosk-orange bg-mosk-orange/5 dark:bg-mosk-orange/10'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={formData.categoryIds.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-5 h-5 text-mosk-orange border-gray-300 rounded focus:ring-mosk-orange"
                    />
                    <span className="ml-3 font-medium text-gray-700 dark:text-gray-200">
                      {category.name}
                    </span>
                  </label>
                ))}
                
                {categories.length === 0 && (
                  <div className="col-span-full text-center py-4 text-gray-500">
                    Henüz kategori bulunmuyor.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default NewsEditorPage;
