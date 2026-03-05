import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, Cpu, Map, Database, Globe, Navigation, Layers, BarChart3 } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { useTheme } from '../context/ThemeContext';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  if (!name) return null;
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as any)[iconName];
  if (!Icon) return null;
  return <Icon className={className} />;
};

interface Service {
  id: number;
  title: string;
  shortTitle?: string;
  shortDescription?: string;
  slug: string;
  icon?: string;
  bgImage?: string;
  content?: string;
  features: string[];
  order: number;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  if (services.length === 0) return null;

  const getShortContent = (content: string, limit: number = 100) => {
    // Remove HTML tags
    const plainText = content.replace(/<[^>]+>/g, '');
    if (plainText.length <= limit) return plainText;
    return plainText.substring(0, limit) + '...';
  };

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-zinc-900 overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-mosk-orange/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm mb-6"
          >
            <Cpu size={16} className="text-mosk-orange" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">Hizmetlerimiz</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Geleceği Şekillendiren <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mosk-orange to-amber-500">Dijital Çözümler</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Her biri kendi alanında uzmanlaşmış çözümlerimizle, kurumunuzun dijital dönüşüm yolculuğunda yanınızdayız.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setActiveService(service.id)}
              onHoverEnd={() => setActiveService(null)}
              className="group relative h-[400px] perspective-1000"
            >
              <Link to={`/services/${service.slug}`} className="block h-full">
                <div className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-3xl shadow-xl border border-slate-100 dark:border-zinc-700/50 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  
                  {/* Background Image on Hover */}
                  {service.bgImage && (
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <img 
                        src={service.bgImage} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/80 dark:bg-black/80 backdrop-blur-[2px]"></div>
                    </div>
                  )}

                  {/* Top Bar - Clean design without colorful gradients */}
                  <div className="h-1 w-full bg-mosk-orange/20 dark:bg-mosk-orange/10 group-hover:bg-mosk-orange transition-colors duration-500 relative z-10" />
                  
                    {/* Content Container - Centered */}
                    <div className="flex flex-col h-full items-center text-center relative z-10 px-6 py-8">
                      
                      {/* Icon Box */}
                      <div className={`
                        w-16 h-16 mb-6 rounded-2xl flex items-center justify-center transition-all duration-300
                        bg-slate-50 dark:bg-white/5 group-hover:bg-white/10 group-hover:backdrop-blur-sm group-hover:scale-110 shadow-sm
                      `}>
                        <div className={`text-mosk-orange group-hover:text-white transition-colors duration-300`}>
                          {service.icon && <DynamicIcon name={service.icon} className="w-8 h-8" />}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 w-full">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-white transition-colors line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                          {service.title}
                        </h3>
                        
                        <div className="h-px w-12 bg-mosk-orange/30 mx-auto mb-4 group-hover:bg-white/30 transition-colors"></div>

                        <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-gray-200 transition-colors line-clamp-3 mb-4">
                          {service.shortDescription || getShortContent(service.content || '')}
                        </p>
                      </div>

                      {/* Hover Content (Features & CTA) */}
                      <div className="mt-auto w-full pt-4 border-t border-slate-100 dark:border-white/10 group-hover:border-white/20 transition-colors">
                        <motion.div 
                          className="flex items-center justify-center text-sm font-bold text-mosk-orange group-hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          Detaylı İncele <ArrowRight size={16} className="ml-2" />
                        </motion.div>
                      </div>
                    </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
