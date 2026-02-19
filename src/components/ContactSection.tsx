import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
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
    <section id="contact" className="py-24 bg-gray-50 dark:bg-zinc-800 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl font-bold text-mosk-dark dark:text-white mb-4">
              İletişime <span className="text-mosk-orange">Geç</span>
            </h2>
            <div className="h-1 w-24 bg-mosk-orange mx-auto rounded-full"></div>
          </motion.div>
          <p className="mt-4 text-mosk-grey dark:text-gray-400 max-w-2xl mx-auto">
            Projeleriniz için profesyonel çözümler sunmak üzere buradayız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-mosk-dark p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-700"
          >
            <h3 className="text-2xl font-bold text-mosk-dark dark:text-white mb-6">Bize Ulaşın</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-mosk-grey dark:text-gray-300 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-mosk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-mosk-grey dark:text-gray-300 mb-2">E-Posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-mosk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-mosk-grey dark:text-gray-300 mb-2">Konu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-mosk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all"
                  placeholder="Mesajınızın konusu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-mosk-grey dark:text-gray-300 mb-2">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-mosk-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mosk-orange transition-all resize-none"
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

          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            {/* Map Container */}
            <div className="flex-grow min-h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-700 relative z-0">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.242784795454!2d28.94631131538965!3d40.20750097938986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca1677c3858487%3A0x627376767222718!2zw4dhbWzEsWNhLCAxLiBOaXlldCBTay4gTm86NDNBLCAxNjExMCBOaWzDvGZlci9CdXJzYQ!5e0!3m2!1str!2str!4v1677654321098!5m2!1str!2str"
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mosk Bilişim Konum"
              ></iframe>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white dark:bg-mosk-dark p-4 rounded-xl shadow border border-slate-100 dark:border-zinc-700 flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-mosk-grey dark:text-gray-400 font-bold uppercase">Telefon</p>
                  <p className="text-mosk-dark dark:text-white font-semibold">+90 (216) 123 45 67</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-mosk-dark p-4 rounded-xl shadow border border-slate-100 dark:border-zinc-700 flex items-center gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-mosk-grey dark:text-gray-400 font-bold uppercase">E-Posta</p>
                  <p className="text-mosk-dark dark:text-white font-semibold">info@moskbilisim.com</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
