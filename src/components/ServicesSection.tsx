import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Map, 
  Layout, 
  Briefcase, 
  Globe, 
  TrendingUp, 
  Database, 
  ScanLine,
  ArrowRight,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';
import whyUsImage from '../assets/why-us-image.png';

const services = [
  {
    id: 1,
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobil Uygulama",
    subtitle: "Yazılım Geliştirme",
    description: "Android ve iOS platformlarında, kullanıcı dostu, yüksek performanslı ve modern arayüze sahip kurumsal mobil çözümler üretiyoruz. Native ve Cross-platform teknolojilerle projenize en uygun altyapıyı sunuyoruz.",
    features: ["iOS & Android", "React Native / Flutter", "Kullanıcı Deneyimi (UX)", "Performans Optimizasyonu"],
    color: "from-blue-500 to-cyan-500",
    image: whyUsImage
  },
  {
    id: 2,
    icon: <Map className="w-6 h-6" />,
    title: "Coğrafi Bilgi",
    subtitle: "Sistemleri (GIS)",
    description: "Konumsal verileri toplayan, işleyen, analiz eden ve sunan gelişmiş harita tabanlı sistemler kuruyoruz. Şehir planlama, altyapı yönetimi ve karar destek mekanizmaları için akıllı harita çözümleri sağlıyoruz.",
    features: ["Mekansal Analiz", "Harita Servisleri", "Veri Toplama", "Envanter Yönetimi"],
    color: "from-green-500 to-emerald-500",
    image: whyUsImage
  },
  {
    id: 3,
    icon: <Layout className="w-6 h-6" />,
    title: "Web Portal",
    subtitle: "Tasarım & Geliştirme",
    description: "Kurumunuzun ihtiyaçlarına özel, modern arayüzlü, responsive ve güvenli web portalları tasarlıyoruz. Yönetim panelleri, vatandaş odaklı hizmetler ve kurumsal kimliğinizi yansıtan web siteleri geliştiriyoruz.",
    features: ["Responsive Tasarım", "CMS Entegrasyonu", "SEO Uyumlu", "Yüksek Güvenlik"],
    color: "from-purple-500 to-pink-500",
    image: whyUsImage
  },
  {
    id: 4,
    icon: <Briefcase className="w-6 h-6" />,
    title: "Danışmanlık",
    subtitle: "Hizmetleri",
    description: "Dijital dönüşüm süreçlerinizde stratejik planlama, teknik altyapı analizi ve proje yönetimi konularında profesyonel danışmanlık desteği sağlıyoruz. İş süreçlerinizi optimize ederek verimliliğinizi artırıyoruz.",
    features: ["Stratejik Planlama", "Süreç Analizi", "Teknoloji Danışmanlığı", "Proje Yönetimi"],
    color: "from-amber-500 to-orange-500",
    image: whyUsImage
  },
  {
    id: 5,
    icon: <Globe className="w-6 h-6" />,
    title: "Web Tabanlı",
    subtitle: "Yazılım Geliştirme",
    description: "Her yerden erişilebilen, ölçeklenebilir ve güvenli bulut tabanlı yazılım mimarileri geliştiriyoruz. SaaS çözümleri, B2B/B2C platformlar ve özel iş uygulamaları ile süreçlerinizi dijitalleştiriyoruz.",
    features: ["Bulut Mimarisi", "SaaS Çözümleri", "API Entegrasyonu", "Mikroservisler"],
    color: "from-indigo-500 to-blue-600",
    image: whyUsImage
  },
  {
    id: 6,
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Gelir Artırıcı",
    subtitle: "Çalışmalar (GAÇ)",
    description: "Belediyeler ve kurumlar için veri analizi ile gelir kaynaklarını tespit edip optimize ediyoruz. Kaçak yapı tespiti, vergi kayıp/kaçak analizleri ve gelir artırıcı stratejiler geliştiriyoruz.",
    features: ["Veri Analizi", "Gelir Optimizasyonu", "Kayıp/Kaçak Tespiti", "Raporlama"],
    color: "from-red-500 to-rose-500",
    image: whyUsImage
  },
  {
    id: 7,
    icon: <Database className="w-6 h-6" />,
    title: "Veri Madenciliği",
    subtitle: "Hizmetleri",
    description: "Büyük verileri anlamlı bilgilere dönüştürerek karar destek mekanizmalarınızı güçlendiriyoruz. Veri temizleme, sınıflandırma ve tahminleme algoritmaları ile geleceğe yönelik içgörüler sunuyoruz.",
    features: ["Big Data", "Tahminleme", "Veri Görselleştirme", "İş Zekası (BI)"],
    color: "from-teal-500 to-cyan-600",
    image: whyUsImage
  },
  {
    id: 8,
    icon: <ScanLine className="w-6 h-6" />,
    title: "Akıllandırma",
    subtitle: "Sayısallaştırma",
    description: "Fiziksel arşivlerinizi ve analog verilerinizi dijital ortama aktararak akıllı sistemlere entegre ediyoruz. OCR teknolojileri ve akıllı indeksleme ile verilerinize hızlı erişim sağlıyoruz.",
    features: ["Dijital Arşiv", "OCR Teknolojisi", "Akıllı İndeksleme", "Veri Entegrasyonu"],
    color: "from-fuchsia-500 to-purple-600",
    image: whyUsImage
  }
];

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

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
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">Teknolojik Yetkinlikler</span>
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
              className="group relative h-[380px] perspective-1000"
            >
              <div className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-3xl shadow-xl border border-slate-100 dark:border-zinc-700/50 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                
                {/* Background Image on Hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/80 dark:bg-black/80 backdrop-blur-[2px]"></div>
                </div>

                {/* Gradient Top Bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${service.color} relative z-10`} />
                
                <div className="p-8 h-full flex flex-col relative z-10">
                  {/* Icon Box */}
                  <div className={`
                    w-14 h-14 mb-6 rounded-2xl flex items-center justify-center transition-all duration-300
                    bg-slate-50 dark:bg-white/5 group-hover:bg-white/10 group-hover:backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3
                  `}>
                    <div className={`text-slate-700 dark:text-white group-hover:text-white transition-all`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <h4 className="text-lg font-medium text-slate-500 dark:text-slate-400 group-hover:text-gray-300 transition-colors">
                      {service.subtitle}
                    </h4>
                  </div>

                  {/* Description (Visible by default, fades out on hover) */}
                  <motion.p 
                    className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4 group-hover:text-gray-300"
                    animate={{ opacity: activeService === service.id ? 0 : 1 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Hover Content (Features List) */}
                  <motion.div 
                    className="absolute inset-x-8 top-[180px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: activeService === service.id ? 1 : 0,
                      y: activeService === service.id ? 0 : 20 
                    }}
                  >
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm font-medium text-white">
                          <div className={`w-1.5 h-1.5 rounded-full mr-3 bg-gradient-to-r ${service.color}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button className="mt-6 flex items-center text-sm font-bold text-mosk-orange group/btn hover:text-white transition-colors">
                      Detaylı İncele <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
