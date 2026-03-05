import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import { useTheme } from '../context/ThemeContext';
import MapErrorBoundary from '../components/MapErrorBoundary';
import MapComponent from '../components/MapComponent';
import { useOutletContext } from 'react-router-dom';

const ContactPage = () => {
  const { isDark } = useTheme();
  const { settings } = useOutletContext<any>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Settings are now provided via context, no need to fetch here if not needed or rely on parent
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert('Mesajınız alındı! En kısa sürede dönüş yapacağız.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>İletişim | {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content="Mosk Bilişim ile iletişime geçin. Projeleriniz ve sorularınız için buradayız." />
      </Helmet>

      <PageTitle 
        title="Bize Ulaşın"
        breadcrumbs={[{ label: 'İletişim' }]}
        description="Projeleriniz, sorularınız ve iş birlikleri için bizimle iletişime geçmekten çekinmeyin."
        bgImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-zinc-700 hover:border-mosk-orange/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-mosk-orange group-hover:text-white transition-colors duration-300 text-blue-600 dark:text-blue-400">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Telefon</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Hafta içi 09:00 - 18:00 arası</p>
            <a href={`tel:${settings?.phone}`} className="text-lg font-semibold text-slate-900 dark:text-white hover:text-mosk-orange transition-colors">
              {settings?.phone || '+90 850 000 00 00'}
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-zinc-700 hover:border-mosk-orange/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-mosk-orange group-hover:text-white transition-colors duration-300 text-green-600 dark:text-green-400">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">E-Posta</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Her zaman bize yazabilirsiniz</p>
            <a href={`mailto:${settings?.email}`} className="text-lg font-semibold text-slate-900 dark:text-white hover:text-mosk-orange transition-colors">
              {settings?.email || 'info@moskbilisim.com'}
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-zinc-700 hover:border-mosk-orange/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-mosk-orange group-hover:text-white transition-colors duration-300 text-purple-600 dark:text-purple-400">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ofis</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Bursa, Türkiye</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {settings?.address || 'Odunluk Mah. Akademi Cad. Zeno Business Center No: 2C / 15 Nilüfer / BURSA'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-zinc-700"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-mosk-orange" size={28} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bize Mesaj Gönderin</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 focus:border-mosk-orange focus:ring-2 focus:ring-mosk-orange/20 outline-none transition-all dark:text-white"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-Posta Adresi</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 focus:border-mosk-orange focus:ring-2 focus:ring-mosk-orange/20 outline-none transition-all dark:text-white"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Konu</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 focus:border-mosk-orange focus:ring-2 focus:ring-mosk-orange/20 outline-none transition-all dark:text-white"
                  placeholder="Mesajınızın konusu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mesajınız</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-700 focus:border-mosk-orange focus:ring-2 focus:ring-mosk-orange/20 outline-none transition-all dark:text-white resize-none"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-mosk-orange to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-mosk-orange/30 hover:shadow-mosk-orange/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Mesajı Gönder
              </button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-zinc-700 relative z-0"
          >
            <MapErrorBoundary>
              <div style={{ height: '100%', width: '100%' }}>
                <MapComponent />
              </div>
            </MapErrorBoundary>
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-xl shadow-lg z-[1000] border border-white/20 pointer-events-none">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="text-mosk-orange" size={18} />
                <span className="font-bold text-slate-900 dark:text-white text-sm">Merkez Ofis</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Nilüfer, Bursa</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
