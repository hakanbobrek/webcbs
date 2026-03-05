import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ChevronRight, Clock, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Helmet } from 'react-helmet-async';
import newsPlaceholder from '../assets/news-placeholder.jpg';

interface News {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  bgImage: string;
  publishedAt: string;
  categories: { id: number; name: string; slug: string }[];
}

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

const NewsListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("TÜMÜ");
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, catsRes, settingsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/news'),
          axios.get('http://localhost:3001/api/news-categories'),
          axios.get('http://localhost:3001/api/settings')
        ]);
        setNews(newsRes.data);
        setCategories(catsRes.data);
        setSettings(settingsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = selectedCategory === "TÜMÜ"
    ? news
    : news.filter(item => item.categories.some(c => c.name === selectedCategory));


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mosk-orange"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Haberler - {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content="Şirketimizden en son haberler, sektörel gelişmeler ve duyurular." />
        <link rel="icon" href={settings?.favicon || '/favicon.svg'} />
      </Helmet>

      <Navbar settings={settings} />
      
      <PageTitle 
        title="Haberler & Duyurular"
        breadcrumbs={[
          { label: 'Haberler' }
        ]}
        description="Teknoloji dünyasındaki yenilikler, projelerimizden güncellemeler ve kurumsal duyurularımızı buradan takip edebilirsiniz."
      />

      <div className="container mx-auto px-4 py-20">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("TÜMÜ")}
            className={`
              px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
              ${selectedCategory === "TÜMÜ"
                ? 'bg-mosk-orange border-mosk-orange text-white shadow-lg shadow-mosk-orange/30 transform scale-105'
                : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:border-mosk-orange hover:text-mosk-orange'
              }
            `}
          >
            TÜMÜ
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                ${selectedCategory === category.name
                  ? 'bg-mosk-orange border-mosk-orange text-white shadow-lg shadow-mosk-orange/30 transform scale-105'
                  : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:border-mosk-orange hover:text-mosk-orange'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <Link 
              key={item.id} 
              to={`/news/${item.slug}`}
              className="group flex flex-col bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-zinc-700/50 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.bgImage || newsPlaceholder} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-800 dark:text-white shadow-sm">
                    <Calendar size={12} className="mr-1.5 text-mosk-orange" />
                    {new Date(item.publishedAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-8 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-mosk-orange transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {item.shortDescription}
                </p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-zinc-700 flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-mosk-orange transition-colors flex items-center">
                    Devamını Oku
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-mosk-orange group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {news.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <Clock size={40} className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Henüz Haber Yok</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Şu anda listelenecek haber veya duyuru bulunmuyor. Lütfen daha sonra tekrar kontrol edin.
            </p>
          </div>
        )}
      </div>

      <Footer settings={settings} />
    </div>
  );
};

export default NewsListPage;
