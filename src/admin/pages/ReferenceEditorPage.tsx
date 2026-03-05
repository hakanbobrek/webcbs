import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Save, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ReferenceCategory {
  id: number;
  name: string;
}

const ReferenceEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<ReferenceCategory[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    logoUrl: '',
    categoryIds: [] as number[]
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchReference();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/reference-categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (error) {
      console.error('Kategoriler yüklenemedi:', error);
    }
  };

  const fetchReference = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:3001/api/references', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const reference = res.data.find((r: any) => r.id === parseInt(id!));
      
      if (reference) {
        setFormData({
          title: reference.title,
          logoUrl: reference.logoUrl || '',
          categoryIds: reference.categories.map((c: any) => c.id)
        });
      } else {
        toast.error('Referans bulunamadı.');
        navigate('/admin/references');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Referans yüklenirken hata oluştu.');
      navigate('/admin/references');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('http://localhost:3001/api/upload/reference', formDataUpload, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setFormData(prev => ({ ...prev, logoUrl: res.data.url }));
      toast.success('Logo yüklendi!');
    } catch (error) {
      toast.error('Logo yüklenemedi.');
    } finally {
      setUploading(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/references/${id}`, formData, config);
        toast.success('Referans güncellendi!');
      } else {
        await axios.post('http://localhost:3001/api/references', formData, config);
        toast.success('Referans oluşturuldu!');
      }
      
      setTimeout(() => navigate('/admin/references'), 1000);
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
                onClick={() => navigate('/admin/references')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Referansı Düzenle' : 'Yeni Referans Ekle'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/admin/references')}
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Temel Bilgiler</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Referans Adı (Kurum/Firma)
                </label>
                <input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 text-lg font-medium rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-mosk-orange/20 focus:border-mosk-orange transition-all"
                  placeholder="Referans Adı Giriniz"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Referans Logosu</h3>
            <div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-mosk-orange transition-colors relative group">
                {formData.logoUrl ? (
                  <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <img src={formData.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain p-4" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, logoUrl: ''})}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Logoyu buraya sürükleyin veya seçin</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Transparan önerilir)</p>
                  </div>
                )}
                {!formData.logoUrl && (
                  <>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="logo-upload"
                      disabled={uploading}
                    />
                    <label 
                      htmlFor="logo-upload" 
                      className="absolute inset-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
              {uploading && <p className="text-sm text-mosk-orange mt-2 text-center">Yükleniyor...</p>}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kategoriler</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Bu referansın ait olduğu kategorileri seçin (Birden fazla seçilebilir).
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

export default ReferenceEditorPage;
