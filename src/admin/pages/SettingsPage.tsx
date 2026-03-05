import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Save, Globe, Phone, Share2, Search, Upload, Layout } from 'lucide-react';

const SettingsPage = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('seo');
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/settings');
      reset(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Ayarlar yüklenemedi.');
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(fieldName);
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setValue(fieldName, response.data.url);
      toast.success('Dosya yüklendi!');
    } catch (error) {
      toast.error('Dosya yüklenirken hata oluştu.');
    } finally {
      setUploading(null);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await axios.put('http://localhost:3001/api/settings', data);
      toast.success('Ayarlar başarıyla güncellendi!');
    } catch (error) {
      toast.error('Güncelleme başarısız.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sayfa Ayarları</h1>
        <button 
          onClick={handleSubmit(onSubmit)}
          className="flex items-center px-6 py-2 bg-mosk-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Kaydet
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'seo' ? 'border-b-2 border-mosk-orange text-mosk-orange bg-orange-50 dark:bg-orange-900/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Search className="w-5 h-5 mr-2" />
            SEO Ayarları
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'contact' ? 'border-b-2 border-mosk-orange text-mosk-orange bg-orange-50 dark:bg-orange-900/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Phone className="w-5 h-5 mr-2" />
            İletişim Bilgileri
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'social' ? 'border-b-2 border-mosk-orange text-mosk-orange bg-orange-50 dark:bg-orange-900/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Sosyal Medya
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'design' ? 'border-b-2 border-mosk-orange text-mosk-orange bg-orange-50 dark:bg-orange-900/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Layout className="w-5 h-5 mr-2" />
            Tasarım & Menü
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Başlığı (Title)</label>
                    <input {...register('siteTitle')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anahtar Kelimeler (Keywords)</label>
                    <input {...register('siteKeywords')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Açıklaması (Description)</label>
                  <textarea {...register('siteDescription')} rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2">Open Graph (Sosyal Medya Paylaşım)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Başlık</label>
                    <input {...register('ogTitle')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Resim</label>
                    <div className="flex items-center gap-2">
                      <input {...register('ogImage')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" readOnly />
                      <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                        <Upload size={20} className={uploading === 'ogImage' ? 'animate-bounce' : ''} />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'ogImage')} accept="image/*" />
                      </label>
                    </div>
                    {watch('ogImage') && <img src={watch('ogImage')} alt="Preview" className="h-10 mt-2 object-contain rounded border bg-gray-50" />}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Açıklama</label>
                  <textarea {...register('ogDescription')} rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2">İkonlar ve Logolar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Favicon (Tarayıcı Sekme İkonu)</label>
                    <div className="flex items-center gap-2">
                      <input {...register('favicon')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" readOnly />
                      <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                        <Upload size={20} className={uploading === 'favicon' ? 'animate-bounce' : ''} />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'favicon')} accept="image/*" />
                      </label>
                    </div>
                    {watch('favicon') && <img src={watch('favicon')} alt="Preview" className="h-8 w-8 mt-2 object-contain rounded border bg-gray-50" />}
                    <p className="text-xs text-gray-500 mt-1">Önerilen: 32x32px veya 16x16px .ico veya .png</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apple Touch Icon (Mobil Ana Ekran)</label>
                    <div className="flex items-center gap-2">
                      <input {...register('appleTouchIcon')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" readOnly />
                      <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                        <Upload size={20} className={uploading === 'appleTouchIcon' ? 'animate-bounce' : ''} />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'appleTouchIcon')} accept="image/*" />
                      </label>
                    </div>
                    {watch('appleTouchIcon') && <img src={watch('appleTouchIcon')} alt="Preview" className="h-10 w-10 mt-2 object-contain rounded border bg-gray-50" />}
                    <p className="text-xs text-gray-500 mt-1">Önerilen: 180x180px .png</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Logosu</label>
                    <div className="flex items-center gap-2">
                      <input {...register('logoUrl')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" readOnly />
                      <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                        <Upload size={20} className={uploading === 'logoUrl' ? 'animate-bounce' : ''} />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logoUrl')} accept="image/*" />
                      </label>
                    </div>
                    {watch('logoUrl') && <img src={watch('logoUrl')} alt="Preview" className="h-16 mt-2 object-contain rounded border bg-gray-50 p-2" />}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon</label>
                    <input {...register('phone')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
                    <input {...register('email')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adres</label>
                  <textarea {...register('address')} rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>
            )}

            {/* Social Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook URL</label>
                    <input {...register('facebook')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter (X) URL</label>
                    <input {...register('twitter')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram URL</label>
                    <input {...register('instagram')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
                    <input {...register('linkedin')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Design Tab */}
            {activeTab === 'design' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Menü Fontu</label>
                    <select {...register('menuFont')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="Inter">Inter (Varsayılan)</option>
                      <option value="Outfit">Outfit</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Menü Maksimum Genişliği</label>
                    <input {...register('menuMaxWidth')} placeholder="Örn: 1280px veya 100%" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo Yüksekliği (Navbar)</label>
                    <input {...register('logoHeight')} placeholder="Örn: 80px veya 5rem" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Navbar Yüksekliği</label>
                    <input {...register('navbarHeight')} placeholder="Örn: 80px veya 5rem" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Menü Font Boyutu</label>
                     <input {...register('menuFontSize')} placeholder="Örn: 14px veya 1rem" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alt Menü Font Boyutu</label>
                     <input {...register('submenuFontSize')} placeholder="Örn: 14px veya 0.9rem" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                   </div>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SettingsPage;
