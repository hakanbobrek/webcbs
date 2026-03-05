import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import referencePlaceholder from '../assets/reference-placeholder.png';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';

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

const ReferencesListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("TÜMÜ");
  const [references, setReferences] = useState<Reference[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { settings } = useOutletContext<any>();
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

  const filteredReferences = selectedCategory === "TÜMÜ"
    ? references
    : references.filter(ref => ref.categories.some(c => c.name === selectedCategory));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mosk-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Referanslar - {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content="İş ortaklarımız ve başarıyla tamamladığımız projeler." />
        <link rel="icon" href={settings?.favicon || '/favicon.svg'} />
      </Helmet>

      <PageTitle 
        title="Referanslarımız"
        breadcrumbs={[
          { label: 'Referanslar' }
        ]}
        description="Türkiye'nin dört bir yanında, teknolojimizle değer kattığımız kurumlar ve markalar."
        bgImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80"
      />

      <div className="container mx-auto px-4 py-16">
        
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

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredReferences.map((ref) => (
              <motion.div
                layout
                key={ref.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-6 flex items-center justify-center hover:shadow-xl hover:border-mosk-orange/30 transition-all duration-300 aspect-square"
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={ref.logoUrl || referencePlaceholder} 
                    alt={ref.title} 
                    className="max-w-full max-h-full object-contain transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute inset-0 bg-mosk-orange/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center p-4 text-center z-10">
                  <h4 className="text-white font-bold text-lg mb-1">{ref.title}</h4>
                  <span className="text-white/80 text-xs uppercase tracking-wider">
                    {ref.categories.map(c => c.name).join(', ')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredReferences.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 dark:text-slate-400">
              Bu kategoride henüz referans eklenmemiş.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferencesListPage;
