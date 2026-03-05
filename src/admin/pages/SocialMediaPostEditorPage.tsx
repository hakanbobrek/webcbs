import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Save, Linkedin, Instagram, Code } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';

interface SocialMediaCategory {
  id: number;
  name: string;
}

const SocialMediaPostEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [categories, setCategories] = useState<SocialMediaCategory[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    embedUrl: '',
    platform: 'LINKEDIN',
    categoryIds: [] as number[]
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/social-media-categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (error) {
      console.error('Kategoriler yüklenemedi:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/social-media-posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const post = res.data.find((p: any) => p.id === parseInt(id!));
      
      if (post) {
        setFormData({
          title: post.title || '',
          embedUrl: post.embedUrl,
          platform: post.platform || 'LINKEDIN',
          categoryIds: post.categories ? post.categories.map((c: any) => c.id) : []
        });
      } else {
        toast.error('Gönderi bulunamadı.');
        navigate('/admin/social-media');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Gönderi yüklenirken hata oluştu.');
      navigate('/admin/social-media');
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

  const extractSrcFromIframe = (input: string) => {
    if (input.includes('<iframe')) {
      const srcMatch = input.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : input;
    }
    return input;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up embed URL if full iframe code was pasted (only for LinkedIn usually)
    // For Instagram, we keep the full URL usually
    const cleanUrl = formData.platform === 'LINKEDIN' ? extractSrcFromIframe(formData.embedUrl) : formData.embedUrl;
    const payload = { ...formData, embedUrl: cleanUrl };

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/social-media-posts/${id}`, payload, config);
        toast.success('Gönderi güncellendi!');
      } else {
        await axios.post('http://localhost:3001/api/social-media-posts', payload, config);
        toast.success('Gönderi oluşturuldu!');
      }
      
      setTimeout(() => navigate('/admin/social-media'), 1000);
    } catch (error) {
      toast.error('Kaydetme işlemi başarısız.');
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/linkedin')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Gönderiyi Düzenle' : 'Yeni Sosyal Medya Gönderisi'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/admin/linkedin')}
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Main Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Gönderi Bilgileri</h3>
            <div className="space-y-4">
              
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'LINKEDIN'})}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      formData.platform === 'LINKEDIN'
                        ? 'border-[#0077b5] bg-blue-50 text-[#0077b5]'
                        : 'border-gray-200 hover:border-blue-200 text-gray-500'
                    }`}
                  >
                    <Linkedin size={24} />
                    <span className="font-bold">LinkedIn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'INSTAGRAM'})}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      formData.platform === 'INSTAGRAM'
                        ? 'border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-gray-200 hover:border-pink-200 text-gray-500'
                    }`}
                  >
                    <Instagram size={24} />
                    <span className="font-bold">Instagram</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Başlık (İsteğe Bağlı)
                </label>
                <input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange transition-all"
                  placeholder="Örn: Yeni Proje Duyurusu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {formData.platform === 'LINKEDIN' ? 'Embed Kodu veya Iframe URL' : 'Instagram Gönderi Linki'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code size={18} className="text-gray-400" />
                  </div>
                  <textarea 
                    value={formData.embedUrl}
                    onChange={(e) => setFormData({...formData, embedUrl: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange h-32 resize-none font-mono text-sm"
                    placeholder={formData.platform === 'LINKEDIN' 
                      ? '<iframe src="https://www.linkedin.com/embed/feed/update/..." ...></iframe>' 
                      : 'https://www.instagram.com/p/...'
                    }
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.platform === 'LINKEDIN' 
                    ? 'LinkedIn gönderisinden aldığınız "Gömülü Gönderi (Embed)" kodunu buraya yapıştırın.'
                    : 'Instagram gönderisinin tam URL adresini buraya yapıştırın (örn: https://www.instagram.com/p/Cj1...)'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Önizleme</h3>
            <div className="flex justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              {formData.embedUrl ? (
                formData.platform === 'LINKEDIN' ? (
                  <iframe 
                    src={extractSrcFromIframe(formData.embedUrl)}
                    height="500" 
                    width="100%" 
                    frameBorder="0" 
                    allowFullScreen 
                    title="Gömülü gönderi"
                    className="rounded-lg max-w-[504px]"
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url={formData.embedUrl} width={328} />
                  </div>
                )
              ) : (
                <div className="h-64 w-full flex flex-col items-center justify-center text-gray-400">
                  {formData.platform === 'LINKEDIN' ? <Linkedin size={48} className="mb-2 opacity-50" /> : <Instagram size={48} className="mb-2 opacity-50" />}
                  <p>Embed kodu girildiğinde önizleme burada görünecek</p>
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kategoriler</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Bu gönderinin ait olduğu kategorileri seçin.
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
                  Henüz kategori bulunmuyor. Önce kategori eklemelisiniz.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SocialMediaPostEditorPage;
