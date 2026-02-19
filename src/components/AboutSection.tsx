import React from 'react';
import { motion } from 'framer-motion';
import { Database, Layers, Code, Globe, Server, Smartphone, Map as MapIcon, Satellite, Plane, ClipboardList, BarChart3, Monitor, Workflow, Activity, Radio, Cpu, Network } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import moskLogo from '../assets/MOSKLogo-01.png';

// --- Components ---

const TechBadge = ({ icon: Icon, label, isDark }: { icon: any, label: string, isDark: boolean }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm transition-all hover:scale-105 cursor-default
    ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}
  `}>
    <Icon size={14} className={isDark ? 'text-mosk-orange' : 'text-mosk-orange'} />
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </div>
);

const NodeCard = ({ icon: Icon, label, subLabel, isDark, type, delay }: { icon: any, label: string, subLabel: string, isDark: boolean, type: 'input' | 'output', delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className={`relative group z-20 w-full max-w-[160px]`}
  >
    <div className={`
      relative p-3 rounded-xl border-2 transition-all duration-300 overflow-hidden
      ${isDark 
        ? 'bg-mosk-dark/90 border-mosk-grey hover:border-mosk-orange/50' 
        : 'bg-white/95 border-slate-200 hover:border-mosk-orange/50'}
      ${type === 'input' 
        ? (isDark ? 'hover:shadow-[0_0_20px_-5px_rgba(223,90,20,0.3)]' : 'hover:shadow-[0_0_20px_-5px_rgba(223,90,20,0.2)]')
        : (isDark ? 'hover:shadow-[0_0_20px_-5px_rgba(127,127,127,0.3)]' : 'hover:shadow-[0_0_20px_-5px_rgba(127,127,127,0.2)]')
      }
    `}>
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
        ${type === 'input' ? 'bg-gradient-to-r from-mosk-orange to-orange-500' : 'bg-gradient-to-r from-mosk-grey to-slate-500'}
      `} />

      <div className="flex items-center gap-3 relative z-10">
        <div className={`
          p-2.5 rounded-lg flex-shrink-0 transition-colors duration-300
          ${isDark ? 'bg-slate-800' : 'bg-slate-100'}
          ${type === 'input' 
            ? (isDark ? 'text-mosk-orange group-hover:bg-mosk-orange/20' : 'text-mosk-orange group-hover:bg-orange-100')
            : (isDark ? 'text-mosk-grey group-hover:bg-mosk-grey/20' : 'text-mosk-grey group-hover:bg-slate-200')
          }
        `}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subLabel}
          </span>
          <span className={`text-xs font-bold leading-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {label}
          </span>
        </div>
      </div>
    </div>
    
    {/* Connector Dot */}
    <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-30
      ${type === 'input' ? '-right-1.5 translate-x-1/2' : '-left-1.5 -translate-x-1/2'}
      ${isDark ? 'bg-mosk-dark border-mosk-grey' : 'bg-white border-slate-300'}
      ${type === 'input' ? 'group-hover:border-mosk-orange group-hover:bg-mosk-orange' : 'group-hover:border-mosk-grey group-hover:bg-mosk-grey'}
      transition-colors duration-300
    `} />
  </motion.div>
);

const ConnectionPath = ({ start, end, isDark, type }: { start: {x: number, y: number}, end: {x: number, y: number}, isDark: boolean, type: 'input' | 'output' }) => {
  const color = type === 'input' 
    ? '#DF5A14' // Mosk Orange
    : '#7F7F7F'; // Mosk Grey

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <defs>
        <filter id={`glow-${type}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id={`grad-${type}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Static Path */}
      <path
        d={`M ${start.x}% ${start.y}% C ${(start.x + end.x) / 2}% ${start.y}%, ${(start.x + end.x) / 2}% ${end.y}%, ${end.x}% ${end.y}%`}
        stroke={`url(#grad-${type}-line)`}
        strokeWidth="2"
        fill="none"
      />

      {/* Animated Dash */}
      <motion.path
        d={`M ${start.x}% ${start.y}% C ${(start.x + end.x) / 2}% ${start.y}%, ${(start.x + end.x) / 2}% ${end.y}%, ${end.x}% ${end.y}%`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 8"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: type === 'input' ? -24 : 24 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        opacity={0.4}
      />

      {/* Data Packet */}
      <circle r="3" fill={color} filter={`url(#glow-${type})`}>
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={`M ${start.x}% ${start.y}% C ${(start.x + end.x) / 2}% ${start.y}%, ${(start.x + end.x) / 2}% ${end.y}%, ${end.x}% ${end.y}%`}
          keyPoints={type === 'input' ? "0;1" : "0;1"}
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>
    </svg>
  );
};

const GisWorkflow = () => {
  const { isDark } = useTheme();

  // We define 3 fixed vertical positions (percentages) for the 3 rows
  const row1 = 20;
  const row2 = 50;
  const row3 = 80;

  const leftX = 25; 
  const rightX = 75;
  const centerX = 50;

  return (
    <div className="relative w-full h-[550px] bg-slate-50 dark:bg-mosk-dark/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      
      {/* Header Bar */}
      <div className="relative z-30 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-mosk-dark/50 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-mosk-orange/10 text-mosk-orange' : 'bg-orange-100 text-mosk-orange'}`}>
            <Network size={18} />
          </div>
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sistem Mimarisi
            </div>
            <div className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Uçtan Uca CBS
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mosk-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mosk-orange"></span>
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-mosk-orange' : 'text-mosk-orange'}`}>
            Aktif
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.1]" 
            style={{ 
              backgroundImage: `linear-gradient(${isDark ? '#7F7F7F' : '#94a3b8'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#7F7F7F' : '#94a3b8'} 1px, transparent 1px)`, 
              backgroundSize: '40px 40px' 
            }} 
        />
        
        {/* SVG Layer for Connections */}
        <div className="absolute inset-0 z-0">
          {/* Inputs -> Center */}
          <ConnectionPath start={{x: leftX, y: row1}} end={{x: centerX, y: 50}} isDark={isDark} type="input" />
          <ConnectionPath start={{x: leftX, y: row2}} end={{x: centerX, y: 50}} isDark={isDark} type="input" />
          <ConnectionPath start={{x: leftX, y: row3}} end={{x: centerX, y: 50}} isDark={isDark} type="input" />
          
          {/* Center -> Outputs */}
          <ConnectionPath start={{x: centerX, y: 50}} end={{x: rightX, y: row1}} isDark={isDark} type="output" />
          <ConnectionPath start={{x: centerX, y: 50}} end={{x: rightX, y: row2}} isDark={isDark} type="output" />
          <ConnectionPath start={{x: centerX, y: 50}} end={{x: rightX, y: row3}} isDark={isDark} type="output" />
        </div>

        {/* Nodes Grid Layout */}
        <div className="absolute inset-0 z-10 grid grid-cols-3 h-full pb-8">
          
          {/* Left Column: Inputs */}
          <div className="flex flex-col justify-between items-center py-10 px-4">
            <NodeCard icon={Satellite} label="Uydu Görüntü" subLabel="Girdi" isDark={isDark} type="input" delay={0.2} />
            <NodeCard icon={Plane} label="Drone / İHA" subLabel="Girdi" isDark={isDark} type="input" delay={0.3} />
            <NodeCard icon={ClipboardList} label="Saha Verisi" subLabel="Girdi" isDark={isDark} type="input" delay={0.4} />
          </div>

          {/* Center Column: Hub */}
          <div className="flex flex-col justify-center items-center relative">
             {/* Center Glow */}
             <div className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none
                ${isDark ? 'bg-mosk-orange' : 'bg-orange-400'}
             `} />
             
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.6 }}
               className={`relative w-40 h-40 rounded-full flex items-center justify-center bg-white dark:bg-mosk-dark shadow-2xl z-20
                 ${isDark ? 'shadow-orange-900/30' : 'shadow-orange-500/20'}
               `}
             >
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-mosk-orange/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute -inset-4 rounded-full border border-mosk-orange/10 animate-[spin_15s_linear_infinite_reverse] border-dashed" />
                
                {/* Logo */}
                <div className="p-8">
                  <img src={moskLogo} alt="Core" className="w-full h-full object-contain" />
                </div>
                
                {/* Label */}
                <div className={`absolute -bottom-5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm
                   ${isDark ? 'bg-mosk-dark border-mosk-grey text-mosk-orange' : 'bg-white border-slate-200 text-mosk-orange'}
                `}>
                  Mosk Core
                </div>
             </motion.div>
          </div>

          {/* Right Column: Outputs */}
          <div className="flex flex-col justify-between items-center py-10 px-4">
            <NodeCard icon={Monitor} label="Web CBS" subLabel="Çıktı" isDark={isDark} type="output" delay={0.5} />
            <NodeCard icon={Smartphone} label="Mobil App" subLabel="Çıktı" isDark={isDark} type="output" delay={0.6} />
            <NodeCard icon={BarChart3} label="Analiz" subLabel="Çıktı" isDark={isDark} type="output" delay={0.7} />
          </div>

        </div>
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-24 bg-white dark:bg-mosk-dark transition-colors duration-700 overflow-hidden relative">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 translate-x-1/3 -translate-y-1/3
          ${isDark ? 'bg-mosk-grey' : 'bg-slate-400'}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 -translate-x-1/3 translate-y-1/3
          ${isDark ? 'bg-mosk-orange' : 'bg-orange-400'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-mosk-orange/20 text-mosk-orange dark:text-mosk-orange text-xs font-bold uppercase tracking-widest mb-8 border border-orange-100 dark:border-mosk-orange/50">
              <Activity size={14} />
              <span>Hakkımızda</span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Veriyi Anlama <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mosk-orange to-red-500">
                Dönüştürün
              </span>
            </h2>
            
            <h3 className={`text-xl font-medium mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Konum teknolojilerinde uçtan uca çözümler ve güçlü altyapı ile geleceği şekillendiriyoruz.
            </h3>

            <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <p>
                Mosk Bilişim olarak, Coğrafi Bilgi Sistemleri (CBS) alanında, yüksek standartlarda harita hizmetleri ve yazılımları sağlıyoruz.
              </p>
              <p>
                Akıllı şehir çözümleri, şube lokasyon analizi ve entegrasyon hizmetleri ile verilerinizi en doğru şekilde işleyip görselleştiriyoruz.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
               <TechBadge icon={Globe} label="OpenLayers" isDark={isDark} />
               <TechBadge icon={Code} label="Leaflet" isDark={isDark} />
               <TechBadge icon={Database} label="PostGIS" isDark={isDark} />
               <TechBadge icon={Server} label="GeoServer" isDark={isDark} />
            </div>

            <div className="mt-10">
               <button className="group px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3">
                 <span>Daha Fazla Bilgi</span>
                 <Workflow size={18} />
               </button>
            </div>
          </motion.div>

          {/* Right Content - Workflow Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <GisWorkflow />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
