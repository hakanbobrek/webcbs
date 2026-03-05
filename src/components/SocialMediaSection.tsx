import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { InstagramEmbed } from 'react-social-media-embed';

interface SocialMediaPost {
  id: number;
  title: string;
  embedUrl: string;
  platform: 'LINKEDIN' | 'INSTAGRAM';
  categories: { id: number; name: string }[];
}

const SocialMediaSection = () => {
  const { isDark } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get('http://localhost:3001/api/social-media-posts');
        setPosts(postsRes.data);
      } catch (error) {
        console.error('Failed to fetch Social Media data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedPlatform === "ALL"
    ? posts
    : posts.filter(post => post.platform === selectedPlatform);

  // Limit to 4 for homepage
  const displayedPosts = filteredPosts.slice(0, 4);

  const extractSrcFromIframe = (input: string) => {
    if (input.includes('<iframe')) {
      const srcMatch = input.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : input;
    }
    return input;
  };

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-mosk-dark transition-colors duration-300 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-4xl font-bold text-mosk-dark dark:text-white">
                Sosyal Medya <span className="text-mosk-orange">Akışımız</span>
              </h2>
            </div>
            <div className="h-1 w-24 bg-mosk-orange mx-auto rounded-full"></div>
          </motion.div>
          <p className="mt-4 text-mosk-grey dark:text-gray-400 max-w-4xl mx-auto">
            Sektörel gelişmeler, başarı hikayelerimiz ve teknoloji odaklı içeriklerimiz için sosyal medya hesaplarımızı takip edin.
          </p>
        </div>

        {/* Platform Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedPlatform("ALL")}
            className={`
              px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border flex items-center gap-2
              ${selectedPlatform === "ALL"
                ? 'bg-mosk-orange border-mosk-orange text-white shadow-lg shadow-mosk-orange/30 transform scale-105'
                : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:border-mosk-orange hover:text-mosk-orange'
              }
            `}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedPlatform("LINKEDIN")}
            className={`
              px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border flex items-center gap-2
              ${selectedPlatform === "LINKEDIN"
                ? 'bg-[#0077b5] border-[#0077b5] text-white shadow-lg shadow-blue-500/30 transform scale-105'
                : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:border-[#0077b5] hover:text-[#0077b5]'
              }
            `}
          >
            <Linkedin size={16} /> LinkedIn
          </button>
          <button
            onClick={() => setSelectedPlatform("INSTAGRAM")}
            className={`
              px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border flex items-center gap-2
              ${selectedPlatform === "INSTAGRAM"
                ? 'bg-gradient-to-tr from-yellow-400 to-purple-600 border-transparent text-white shadow-lg shadow-purple-500/30 transform scale-105'
                : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:border-pink-500 hover:text-pink-600'
              }
            `}
          >
            <Instagram size={16} /> Instagram
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <AnimatePresence mode='popLayout'>
            {displayedPosts.map((post, index) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-white dark:bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                {post.platform === 'LINKEDIN' ? (
                  <div className="w-full h-[550px] relative bg-slate-50">
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
                  <div className="w-full h-[550px] flex flex-col justify-center items-center bg-white p-0 overflow-hidden">
                     <div className="w-full h-full flex items-center justify-center scale-90 origin-center">
                        <InstagramEmbed url={post.embedUrl} width="100%" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                     </div>
                  </div>
                )}
                
                {/* Platform Badge */}
                <div className="absolute top-4 right-4 z-10">
                   {post.platform === 'LINKEDIN' ? (
                      <div className="bg-[#0077b5] text-white p-2 rounded-full shadow-lg">
                        <Linkedin size={18} />
                      </div>
                   ) : (
                      <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 text-white p-2 rounded-full shadow-lg">
                        <Instagram size={18} />
                      </div>
                   )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Bu kategoride paylaşım bulunmuyor.
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link
            to="/social-media"
            className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-full text-mosk-secondary dark:text-white font-bold shadow-lg hover:shadow-xl hover:border-mosk-orange hover:text-mosk-orange transition-all duration-300"
          >
            Tüm Paylaşımları Gör <ChevronDown size={18} className="-rotate-90" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SocialMediaSection;
