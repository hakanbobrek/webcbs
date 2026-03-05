import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, ExternalLink, Grid } from 'lucide-react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { InstagramEmbed } from 'react-social-media-embed';

interface SocialMediaPost {
  id: number;
  title: string;
  embedUrl: string;
  platform: 'LINKEDIN' | 'INSTAGRAM';
  categories: { id: number; name: string }[];
}

interface SocialMediaCategory {
  id: number;
  name: string;
}

const SocialMediaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("TÜMÜ");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL"); // ALL, LINKEDIN, INSTAGRAM
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [categories, setCategories] = useState<SocialMediaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useOutletContext<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/social-media-posts'),
          axios.get('http://localhost:3001/api/social-media-categories')
        ]);
        setPosts(postsRes.data);
        setCategories(catsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === "TÜMÜ" || post.categories.some(c => c.name === selectedCategory);
    const platformMatch = selectedPlatform === "ALL" || post.platform === selectedPlatform;
    return categoryMatch && platformMatch;
  });

  const extractSrcFromIframe = (input: string) => {
    if (input.includes('<iframe')) {
      const srcMatch = input.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : input;
    }
    return input;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mosk-orange"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Sosyal Medya - {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content="Şirketimizden en son sosyal medya paylaşımları ve sektörel güncellemeler." />
        <link rel="icon" href={settings?.favicon || '/favicon.svg'} />
      </Helmet>

      <PageTitle 
        title="Sosyal Medya"
        bgImage="https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070&auto=format&fit=crop"
        breadcrumbs={[
          { label: 'Sosyal Medya' }
        ]}
        description="Teknoloji, inovasyon ve sektörel gelişmeler hakkındaki en son paylaşımlarımızı buradan takip edebilirsiniz."
      />

      <div className="container mx-auto px-4 py-20">
        
        {/* Platform Filters */}
        <div className="flex justify-center gap-4 mb-8">
           <button 
             onClick={() => setSelectedPlatform("ALL")}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${selectedPlatform === 'ALL' ? 'bg-mosk-dark text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
           >
             <Grid size={18} /> Tümü
           </button>
           <button 
             onClick={() => setSelectedPlatform("LINKEDIN")}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${selectedPlatform === 'LINKEDIN' ? 'bg-[#0077b5] text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-blue-50'}`}
           >
             <Linkedin size={18} /> LinkedIn
           </button>
           <button 
             onClick={() => setSelectedPlatform("INSTAGRAM")}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${selectedPlatform === 'INSTAGRAM' ? 'bg-gradient-to-tr from-yellow-400 to-purple-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-purple-50'}`}
           >
             <Instagram size={18} /> Instagram
           </button>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
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
              Hepsi
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
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode='popLayout'>
            {filteredPosts.map((post, index) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-zinc-700/50"
              >
                {post.platform === 'LINKEDIN' ? (
                  <div className="w-full h-[550px] relative bg-slate-50 dark:bg-zinc-900/50">
                    <iframe 
                      src={extractSrcFromIframe(post.embedUrl)}
                      height="100%" 
                      width="100%" 
                      frameBorder="0" 
                      allowFullScreen 
                      sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
                      title={post.title || "LinkedIn Post"}
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[550px] flex flex-col justify-center items-center bg-white dark:bg-zinc-900/50 p-0 overflow-hidden">
                     {/* Instagram Embed Handling */}
                     <div className="w-full h-full flex items-center justify-center scale-90 origin-center">
                        <InstagramEmbed url={post.embedUrl} width="100%" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                     </div>
                  </div>
                )}
                
                {/* Platform Badge */}
                <div className="absolute top-4 right-4 z-10">
                   {post.platform === 'LINKEDIN' ? (
                      <div className="bg-[#0077b5] text-white p-2 rounded-full shadow-lg">
                        <Linkedin size={20} />
                      </div>
                   ) : (
                      <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 text-white p-2 rounded-full shadow-lg">
                        <Instagram size={20} />
                      </div>
                   )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
              <Grid size={40} className="text-mosk-orange" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Henüz Paylaşım Yok</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Şu anda bu kategoride listelenecek sosyal medya paylaşımı bulunmuyor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaPage;
