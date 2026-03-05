import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail } from 'lucide-react';
import SectionHeader from './SectionHeader';
import SectionDivider from './SectionDivider';
import { useTheme } from '../context/ThemeContext';

import MapComponent from './MapComponent';
import MapErrorBoundary from './MapErrorBoundary';

interface ContactSectionProps {
  settings?: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mesajınız başarıyla gönderildi!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div>
            <SectionHeader 
              badge="İLETİŞİM" 
              title={<>İletişim</>}
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Projeleriniz, sorularınız veya iş birliği talepleriniz için bize ulaşın. 
                Uzman ekibimiz en kısa sürede size dönüş yapacaktır.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Telefon</p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {settings?.phone || '+90 (224) 451 98 12'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">E-Posta</p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {settings?.email || 'info@moskbilisim.com'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 h-[300px] relative z-0">
                <MapErrorBoundary>
                  <div style={{ height: '100%', width: '100%' }}>
                    <MapComponent />
                  </div>
                </MapErrorBoundary>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 lg:mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bize Yazın</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-Posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all"
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all"
                  placeholder="Mesajınızın konusu"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all resize-none"
                  placeholder="Bize iletmek istediğiniz mesaj..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-mosk-orange text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group"
              >
                Gönder <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
