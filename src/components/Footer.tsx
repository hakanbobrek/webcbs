import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import moskLogo from '../assets/MOSKLogo-01.png';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-mosk-dark border-t border-slate-200 dark:border-zinc-800 pt-20 pb-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-mosk-orange/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-mosk-grey/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <img src={moskLogo} alt="Mosk Bilişim" className="h-[13rem] w-auto object-contain" />
            <p className="text-mosk-grey dark:text-gray-400 leading-relaxed">
              Coğrafi Bilgi Sistemleri ve Akıllı Şehir Teknolojileri alanında öncü çözümler sunan teknoloji ortağınız.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-mosk-secondary dark:text-gray-400 hover:bg-mosk-orange hover:text-white dark:hover:bg-mosk-orange dark:hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-mosk-dark dark:text-white mb-6">Hızlı Erişim</h3>
            <ul className="space-y-3">
              {['Ana Sayfa', 'Kurumsal', 'Çözümlerimiz', 'Referanslar', 'İletişim', 'Kariyer'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center group text-mosk-grey dark:text-gray-400 hover:text-mosk-orange dark:hover:text-mosk-orange transition-colors">
                    <ChevronRight size={16} className="mr-2 text-mosk-orange opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-mosk-dark dark:text-white mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {['Coğrafi Bilgi Sistemleri', 'Akıllı Şehir Çözümleri', 'Mobil Uygulama Geliştirme', 'Web Tabanlı Yazılımlar', 'Veri Sayısallaştırma', 'Danışmanlık Hizmetleri'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center group text-mosk-grey dark:text-gray-400 hover:text-mosk-orange dark:hover:text-mosk-orange transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-mosk-orange mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-mosk-dark dark:text-white mb-6">İletişim</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-zinc-800 text-mosk-orange">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-mosk-dark dark:text-white text-sm mb-1">Adres</h4>
                  <p className="text-sm text-mosk-grey dark:text-gray-400">Çamlıca Mah. 1. Niyet Sk. No:43A NİLÜFER/ BURSA</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-zinc-800 text-mosk-orange">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-mosk-dark dark:text-white text-sm mb-1">Telefon</h4>
                  <p className="text-sm text-mosk-grey dark:text-gray-400">+90 (216) 123 45 67</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-zinc-800 text-mosk-orange">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-mosk-dark dark:text-white text-sm mb-1">E-Posta</h4>
                  <p className="text-sm text-mosk-grey dark:text-gray-400">info@moskbilisim.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-mosk-grey dark:text-gray-500 text-center md:text-left">
            © {currentYear} <span className="font-bold text-mosk-dark dark:text-white">Mosk Bilişim</span>. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-mosk-grey dark:text-gray-500">
            <a href="#" className="hover:text-mosk-orange transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-mosk-orange transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-mosk-orange transition-colors">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
