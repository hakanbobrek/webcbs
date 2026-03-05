import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import newsPlaceholder from '../assets/news-placeholder.jpg';
import { useTheme } from '../context/ThemeContext';
import PageTitle from '../components/PageTitle';
import { Helmet } from 'react-helmet-async';

interface News {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  bgImage: string;
  publishedAt: string;
}

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useOutletContext<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/news')
        ]);
        setNews(newsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Haberler | {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content="Mosk Bilişim'den en son haberler, duyurular ve sektörel gelişmeler." />
      </Helmet>

      <PageTitle 
        title="Haberler & Duyurular"
        breadcrumbs={[{ label: 'Haberler' }]}
        description="Kurumsal gelişmelerimiz, yeni projelerimiz ve sektörden en son haberleri takip edin."
        bgImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
      />

      <div className="container mx-auto px-4 py-16 relative z-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mosk-orange"></div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            Henüz haber bulunmuyor.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Link to={`/news/${item.slug}`} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-zinc-800"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={item.bgImage || newsPlaceholder} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
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
        )}
      </div>
    </div>
  );
};

export default NewsPage;
