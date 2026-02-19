import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import newsPlaceholder from '../assets/news-placeholder.jpg';

const newsItems = [
  {
    id: 1,
    title: "Orhaneli Belediyesi'nde Coğrafi Bilgi Sistemi",
    date: "25-12-2022",
    description: "Orhaneli Belediyesi, dijital dönüşüm çalışmaları kapsamında Coğrafi Bilgi Sistemi altyapısını modernize etti.",
    image: newsPlaceholder
  },
  {
    id: 2,
    title: "Akıllı Şehir Çözümleri Zirvesi",
    date: "15-01-2023",
    description: "Akıllı şehir teknolojileri alanındaki en son yeniliklerin tartışıldığı zirveye katılım sağladık.",
    image: newsPlaceholder
  },
  {
    id: 3,
    title: "Yerel Yönetimlerde Dijital Dönüşüm",
    date: "02-02-2023",
    description: "Belediyeler için geliştirdiğimiz yeni nesil mobil uygulamalar ile vatandaş odaklı hizmetler sunuyoruz.",
    image: newsPlaceholder
  },
  {
    id: 4,
    title: "Yeni Nesil İmar Arşivi Projesi",
    date: "10-03-2023",
    description: "Fiziksel arşivlerin dijital ortama aktarılması ve akıllı arama motorları ile entegrasyonu tamamlandı.",
    image: newsPlaceholder
  }
];

export const NewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-mosk-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl font-bold text-mosk-dark dark:text-white mb-4">
              Güncel <span className="text-mosk-orange">Haberler</span>
            </h2>
            <div className="h-1 w-24 bg-mosk-orange mx-auto rounded-full"></div>
          </motion.div>
          <p className="mt-4 text-mosk-grey dark:text-gray-400 max-w-2xl mx-auto">
            Kurumsal gelişmelerimiz, yeni projelerimiz ve sektörden en son haberleri takip edin.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsItems.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay - Always visible but darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                
                {/* Date Badge */}
                <div className="absolute top-6 right-6 bg-mosk-orange/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <Calendar size={12} />
                  {news.date}
                </div>

                {/* Text Content */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-mosk-orange transition-colors">
                    {news.title}
                  </h3>
                  
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                      {news.description}
                    </p>
                    <span className="inline-flex items-center text-mosk-orange text-sm font-semibold hover:text-white transition-colors">
                      Devamını Oku <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-mosk-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
