import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import newsPlaceholder from '../assets/news-placeholder.jpg';
import { useTheme } from '../context/ThemeContext';

interface News {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  bgImage: string;
  publishedAt: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/news');
        // Get latest 4 news
        setNews(res.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return null; // Or a skeleton loader
  if (news.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-mosk-dark relative overflow-hidden">
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
          {news.map((item, index) => (
            <Link to={`/news/${item.slug}`} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={item.bgImage || newsPlaceholder} 
                    alt={item.title}
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
                    {new Date(item.publishedAt).toLocaleDateString('tr-TR')}
                  </div>

                  {/* Text Content */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-mosk-orange transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                        {item.shortDescription}
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
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/news"
            className="group relative flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-mosk-orange rounded-full text-mosk-orange dark:text-white font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.5)]"
          >
            <span className="absolute inset-0 w-full h-full bg-mosk-orange transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
              Tüm Haberleri Gör <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewsSection;
