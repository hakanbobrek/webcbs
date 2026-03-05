import React from 'react';
import { motion } from 'framer-motion';
import { Database, Layers, Code, Globe, Server, Smartphone, Cpu, Shield, Box, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SectionDivider from './SectionDivider';

const TechStackCard = ({ icon: Icon, title, items, color, delay }: { icon: any, title: string, items: string[], color: string, delay: number }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${isDark ? 'bg-mosk-dark/50 border-slate-700 hover:border-mosk-orange/30' : 'bg-white border-slate-200 hover:border-mosk-orange/30'}
      `}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className={`px-2 py-1 rounded-md text-xs font-semibold
            ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}
          `}>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-24 bg-white dark:bg-mosk-dark transition-colors duration-700 overflow-hidden relative">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 translate-x-1/3 -translate-y-1/3
          ${isDark ? 'bg-mosk-grey' : 'bg-slate-400'}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 -translate-x-1/3 translate-y-1/3
          ${isDark ? 'bg-mosk-orange' : 'bg-orange-400'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-mosk-orange/20 text-mosk-orange dark:text-mosk-orange text-xs font-bold uppercase tracking-widest mb-8 border border-orange-100 dark:border-mosk-orange/50">
              <Zap size={14} />
              <span>Teknoloji & Altyapı</span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Modern Çözümler <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mosk-orange to-red-500">
                Güçlü Mimari
              </span>
            </h2>
            
            <h3 className={`text-xl font-medium mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              En güncel teknolojileri kullanarak ölçeklenebilir, güvenli ve performanslı CBS sistemleri inşa ediyoruz.
            </h3>

            <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <p>
                Açık kaynak kodlu kütüphanelerden kurumsal veritabanı çözümlerine kadar geniş bir teknoloji yelpazesiyle projelerinize değer katıyoruz.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Tech Stack Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TechStackCard 
              icon={Globe} 
              title="Frontend & Harita" 
              items={['React', 'TypeScript', 'OpenLayers', 'Leaflet', 'Mapbox GL']} 
              color="bg-blue-500"
              delay={0.1}
            />
            <TechStackCard 
              icon={Server} 
              title="Backend & API" 
              items={['Node.js', '.NET Core', 'Python', 'GraphQL', 'REST API']} 
              color="bg-green-500"
              delay={0.2}
            />
            <TechStackCard 
              icon={Database} 
              title="Veritabanı & CBS" 
              items={['PostgreSQL', 'PostGIS', 'SQL Server', 'GeoServer', 'Redis']} 
              color="bg-orange-500"
              delay={0.3}
            />
            <TechStackCard 
              icon={Smartphone} 
              title="Mobil & Platform" 
              items={['React Native', 'Flutter', 'PWA', 'Docker', 'Kubernetes']} 
              color="bg-purple-500"
              delay={0.4}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
