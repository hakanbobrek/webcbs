import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Users, Zap, Move3d, Hand, MoveHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CityScene = React.lazy(() => import('./CityScene'));

const Hero = () => {
  const { isDark } = useTheme();
  
  // Use Intersection Observer to only load the heavy 3D scene when near viewport
  // Though Hero is at top, this helps defer it slightly during initial bundle parse
  // Or we can just use Suspense fallback
  
  return (
    <div className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-mosk-dark transition-colors duration-700 font-sans">
      
      {/* Full Screen 3D Background */}
      <div className="absolute inset-0 z-0">
         <React.Suspense fallback={<div className="w-full h-full bg-slate-50" />}>
            <CityScene />
         </React.Suspense>
      </div>

      {/* Creative Gradient Overlay - Provides readability without a box */}
      {/* Added pointer-events-none to ensure clicks pass through to the 3D canvas */}
      <div className={`
        absolute inset-0 z-0 pointer-events-none transition-colors duration-700
        bg-gradient-to-r 
        ${isDark 
          ? 'from-white/90 via-white/80 to-transparent' 
          : 'from-slate-50 via-slate-50/90 to-transparent'}
        w-[90%] md:w-[70%] lg:w-[60%]
      `} />

      {/* Interactive Hint Overlay - Right Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute right-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-4"
      >
        <div className={`
          relative flex items-center justify-center w-20 h-20 rounded-full backdrop-blur-md border-2 shadow-[0_0_30px_rgba(223,90,20,0.3)]
          ${isDark ? 'bg-mosk-dark/40 border-mosk-orange/50' : 'bg-white/40 border-mosk-orange/50'}
        `}>
          <div className="absolute inset-0 rounded-full border-2 border-mosk-orange opacity-20 animate-ping"></div>
          <MoveHorizontal size={32} className={`
            ${isDark ? 'text-white' : 'text-mosk-orange'}
            animate-[pulse_2s_ease-in-out_infinite]
          `} />
          
          {/* Animated Hand */}
          <motion.div
            animate={{ x: [-15, 15, -15] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
          >
              <Hand size={24} className={`
                ${isDark ? 'text-mosk-orange' : 'text-mosk-orange'}
                drop-shadow-lg
              `} />
          </motion.div>
        </div>
        
        <div className={`
          px-4 py-2 rounded-xl text-sm font-bold tracking-widest uppercase backdrop-blur-md border
          ${isDark ? 'bg-mosk-dark/60 border-mosk-grey text-white' : 'bg-white/60 border-white text-mosk-secondary'}
        `}>
          Sürükle & Keşfet
        </div>
      </motion.div>

      {/* Main Content Area */}
      {/* Added pointer-events-none to the container, and pointer-events-auto ONLY to interactive elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center min-h-[80vh] pointer-events-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8 pointer-events-auto select-none"
            >
              <div className="h-[2px] w-12 bg-mosk-orange"></div>
              <span className="text-mosk-orange font-bold tracking-widest uppercase text-sm">
                Geleceğin Şehir Teknolojileri
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className={`font-display text-glow text-[48px] md:text-[72px] lg:text-[88px] font-extrabold leading-[1.05] mb-8 ${isDark ? 'text-slate-900' : 'text-slate-900'} pointer-events-auto select-none`}>
              Akıllı Şehirler <br />
              <span className={`relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-mosk-orange via-orange-500 to-amber-500 font-serif italic tracking-wide`}>
                Akıllı Çözümler
                <span className={`${isDark ? 'bg-orange-200/50' : 'bg-orange-200/50'} absolute -inset-1 blur-xl rounded-full -z-10`}></span>
              </span>
            </h1>

            {/* Description */}
            <p className={`text-lg md:text-2xl mb-12 max-w-xl leading-relaxed font-light ${isDark ? 'text-slate-600' : 'text-slate-600'} pointer-events-auto select-none`}>
              Konumsal dijitalleşmenin öncüsü olarak, <strong className="font-semibold text-mosk-orange">CBS</strong> ve mühendislik çözümleriyle yarını şekillendiriyor, bugünü kolaylaştırıyoruz.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-5 bg-mosk-orange hover:bg-orange-700 text-white text-lg font-bold rounded-full shadow-xl shadow-mosk-orange/30 transition-all flex items-center justify-center gap-3"
              >
                Hemen Başlayın 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-5 text-lg font-semibold rounded-full border-2 transition-colors flex items-center justify-center gap-3
                  ${isDark 
                    ? 'border-mosk-grey text-white hover:bg-slate-800 hover:border-slate-600' 
                    : 'border-slate-300 text-slate-800 hover:bg-white hover:border-slate-400'}
                `}
              >
                Projelerimiz
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Floating Dashboard Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 z-20 px-4 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className={`
            flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-3xl backdrop-blur-xl border shadow-2xl select-none
            ${isDark 
              ? 'bg-mosk-dark/50 border-mosk-grey/30 text-white' 
              : 'bg-white/60 border-white/50 text-slate-900'}
          `}>
            
            {/* Stats Group */}
            <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-mosk-orange/20 text-mosk-orange' : 'bg-orange-100 text-mosk-orange'}`}>
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Belediye</div>
                </div>
              </div>

              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-mosk-grey/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  <Activity size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">%40</div>
                  <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Verimlilik</div>
                </div>
              </div>

              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-mosk-orange/20 text-mosk-orange' : 'bg-orange-100 text-mosk-orange'}`}>
                  <Zap size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">7/24</div>
                  <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Aktif Destek</div>
                </div>
              </div>
            </div>

            {/* Moved Interaction Hint to right side floating element */}

          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Hero;
