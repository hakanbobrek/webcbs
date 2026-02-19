import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import referencePlaceholder from '../assets/reference-placeholder.png';

// Categories
const categories = [
  "TÜMÜ",
  "AKILLANDIRMA/SAYISALLAŞTIRMA",
  "CBS",
  "DANIŞMANLIK",
  "CAÇ",
  "MOBİL UYGULAMA",
  "SAYISALLAŞTIRMA"
];

// Sample References Data (5 items per category effectively)
const references = [
  // AKILLANDIRMA/SAYISALLAŞTIRMA
  { id: 1, title: "Gebze Belediyesi", category: "AKILLANDIRMA/SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 2, title: "Gebze Belediyesi", category: "AKILLANDIRMA/SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 3, title: "Gebze Belediyesi", category: "AKILLANDIRMA/SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 4, title: "Gebze Belediyesi", category: "AKILLANDIRMA/SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 5, title: "Gebze Belediyesi", category: "AKILLANDIRMA/SAYISALLAŞTIRMA", image: referencePlaceholder },
  
  // CBS
  { id: 6, title: "Gebze Belediyesi", category: "CBS", image: referencePlaceholder },
  { id: 7, title: "Gebze Belediyesi", category: "CBS", image: referencePlaceholder },
  { id: 8, title: "Gebze Belediyesi", category: "CBS", image: referencePlaceholder },
  { id: 9, title: "Gebze Belediyesi", category: "CBS", image: referencePlaceholder },
  { id: 10, title: "Gebze Belediyesi", category: "CBS", image: referencePlaceholder },

  // DANIŞMANLIK
  { id: 11, title: "Gebze Belediyesi", category: "DANIŞMANLIK", image: referencePlaceholder },
  { id: 12, title: "Gebze Belediyesi", category: "DANIŞMANLIK", image: referencePlaceholder },
  { id: 13, title: "Gebze Belediyesi", category: "DANIŞMANLIK", image: referencePlaceholder },
  { id: 14, title: "Gebze Belediyesi", category: "DANIŞMANLIK", image: referencePlaceholder },
  { id: 15, title: "Gebze Belediyesi", category: "DANIŞMANLIK", image: referencePlaceholder },

  // CAÇ
  { id: 16, title: "Gebze Belediyesi", category: "CAÇ", image: referencePlaceholder },
  { id: 17, title: "Gebze Belediyesi", category: "CAÇ", image: referencePlaceholder },
  { id: 18, title: "Gebze Belediyesi", category: "CAÇ", image: referencePlaceholder },
  { id: 19, title: "Gebze Belediyesi", category: "CAÇ", image: referencePlaceholder },
  { id: 20, title: "Gebze Belediyesi", category: "CAÇ", image: referencePlaceholder },

  // MOBİL UYGULAMA
  { id: 21, title: "Gebze Belediyesi", category: "MOBİL UYGULAMA", image: referencePlaceholder },
  { id: 22, title: "Gebze Belediyesi", category: "MOBİL UYGULAMA", image: referencePlaceholder },
  { id: 23, title: "Gebze Belediyesi", category: "MOBİL UYGULAMA", image: referencePlaceholder },
  { id: 24, title: "Gebze Belediyesi", category: "MOBİL UYGULAMA", image: referencePlaceholder },
  { id: 25, title: "Gebze Belediyesi", category: "MOBİL UYGULAMA", image: referencePlaceholder },

  // SAYISALLAŞTIRMA
  { id: 26, title: "Gebze Belediyesi", category: "SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 27, title: "Gebze Belediyesi", category: "SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 28, title: "Gebze Belediyesi", category: "SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 29, title: "Gebze Belediyesi", category: "SAYISALLAŞTIRMA", image: referencePlaceholder },
  { id: 30, title: "Gebze Belediyesi", category: "SAYISALLAŞTIRMA", image: referencePlaceholder },
];

export const ReferencesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("TÜMÜ");
  const [showAll, setShowAll] = useState(false);

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  const filteredReferences = selectedCategory === "TÜMÜ" 
    ? references 
    : references.filter(ref => ref.category === selectedCategory);

  const displayedReferences = showAll 
    ? filteredReferences 
    : filteredReferences.slice(0, 10);

  const hasMore = filteredReferences.length > 10;

  return (
    <section className="py-24 bg-white dark:bg-zinc-900 transition-colors duration-300">
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
              Referans<span className="text-mosk-orange">larımız</span>
            </h2>
            <div className="h-1 w-24 bg-mosk-orange mx-auto rounded-full"></div>
          </motion.div>
          <p className="mt-4 text-mosk-grey dark:text-gray-400 max-w-2xl mx-auto">
            Türkiye'nin dört bir yanında, teknolojimizle değer kattığımız kurumlar.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                ${selectedCategory === category
                  ? 'bg-mosk-orange border-mosk-orange text-white shadow-lg shadow-mosk-orange/30 transform scale-105'
                  : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:border-mosk-orange hover:text-mosk-orange'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {displayedReferences.map((ref) => (
              <motion.div
                layout
                key={ref.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-mosk-dark border border-slate-100 dark:border-zinc-800 rounded-xl p-6 flex items-center justify-center hover:shadow-xl hover:border-mosk-orange/30 transition-all duration-300"
              >
                <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                  <img 
                    src={ref.image} 
                    alt={ref.title} 
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute inset-0 bg-mosk-orange/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center p-4 text-center">
                  <h4 className="text-white font-bold text-lg mb-1">{ref.title}</h4>
                  <span className="text-white/80 text-xs uppercase tracking-wider">{ref.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show All Button */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-full text-mosk-secondary dark:text-white font-bold shadow-lg hover:shadow-xl hover:border-mosk-orange hover:text-mosk-orange transition-all duration-300"
            >
              {showAll ? (
                <>
                  Daha Az Göster <ChevronUp size={18} />
                </>
              ) : (
                <>
                  Tümünü Gör ({filteredReferences.length - 10} daha) <ChevronDown size={18} />
                </>
              )}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
