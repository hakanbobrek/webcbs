import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import referencePlaceholder from '../assets/reference-placeholder.png';
import SectionDivider from './SectionDivider';
import { useTheme } from '../context/ThemeContext';

interface Reference {
  id: number;
  title: string;
  logoUrl: string;
  categories: { id: number; name: string; slug: string }[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const ReferencesSection = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("TÜMÜ");
  const [references, setReferences] = useState<Reference[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [refsRes, catsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/references'),
          axios.get('http://localhost:3001/api/reference-categories')
        ]);
        setReferences(refsRes.data);
        setCategories(catsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter references
  const filteredReferences = selectedCategory === "TÜMÜ"
    ? references
    : references.filter(ref => ref.categories.some(c => c.name === selectedCategory));

  // Limit to 10 for homepage
  const displayedReferences = filteredReferences.slice(0, 10);
  
  if (loading) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden transition-colors duration-500">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Glowing Orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-mosk-orange/5 rounded-full blur-[120px] mix-blend-screen animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse translate-x-1/3 translate-y-1/3 delay-1000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-mosk-orange/20 rounded-full blur-3xl animate-bounce duration-[10000ms]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-bounce duration-[8000ms] delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Referans<span className="text-mosk-orange">larımız</span>
            </h2>
            <div className="w-20 h-1 bg-mosk-orange rounded-full mx-auto shadow-lg shadow-mosk-orange/50"></div>
          </motion.div>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Türkiye'nin dört bir yanında, teknolojimizle değer kattığımız seçkin kurumlar.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setSelectedCategory("TÜMÜ")}
            className={`
              px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border backdrop-blur-md
              ${selectedCategory === "TÜMÜ"
                ? 'bg-mosk-orange text-white border-mosk-orange shadow-lg shadow-mosk-orange/40 transform scale-105'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-mosk-orange/50 hover:text-white'
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
                px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border backdrop-blur-md
                ${selectedCategory === category.name
                  ? 'bg-mosk-orange text-white border-mosk-orange shadow-lg shadow-mosk-orange/40 transform scale-105'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-mosk-orange/50 hover:text-white'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <AnimatePresence mode='popLayout'>
            {displayedReferences.map((ref) => (
              <motion.div
                layout
                key={ref.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-2xl p-6 flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-mosk-orange/20 transition-all duration-500 aspect-square overflow-hidden"
              >
                {/* Glow Effect behind logo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-mosk-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-full h-full flex items-center justify-center z-10 p-4">
                  <img 
                    src={ref.logoUrl || referencePlaceholder} 
                    alt={ref.title} 
                    className="max-w-full max-h-full object-contain transition-all duration-500 transform group-hover:scale-110 drop-shadow-sm"
                  />
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute inset-0 bg-mosk-orange/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center z-20 backdrop-blur-sm translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-white font-bold text-lg mb-2 drop-shadow-md">{ref.title}</h4>
                  <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {ref.categories.map(c => c.name).join(', ')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredReferences.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-lg">
            Bu kategoride referans bulunamadı.
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link
            to="/references"
            className="group relative flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-mosk-orange rounded-full text-white font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.5)]"
          >
            <span className="absolute inset-0 w-full h-full bg-mosk-orange transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center gap-2">
              Tüm Referansları Gör ({references.length}) <ChevronDown size={20} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ReferencesSection;
