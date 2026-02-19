import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import moskLogoYan from '../assets/MoskLogoYan-01.png';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Ana Sayfa', href: '#' },
    { name: 'Çözümler', href: '#' },
    { name: 'Hizmetler', href: '#' },
    { name: 'Hakkımızda', href: '#' },
    { name: 'İletişim', href: '#' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-mosk-dark/90 backdrop-blur-xl border-b border-mosk-grey/20 dark:border-mosk-grey/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <img 
              src={moskLogoYan} 
              alt="Mosk Bilişim" 
              className="h-[13rem] w-auto object-contain" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-mosk-secondary dark:text-slate-300 hover:text-mosk-orange dark:hover:text-mosk-orange font-medium text-sm transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mosk-orange transition-all group-hover:w-full"></span>
                </a>
              ))}
              
              <div className="h-6 w-px bg-mosk-grey/20 dark:bg-mosk-grey/20 mx-2"></div>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-mosk-secondary dark:text-slate-300 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-mosk-dark border-b border-mosk-grey/20 dark:border-mosk-grey/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-mosk-secondary dark:text-slate-300 hover:text-mosk-orange dark:hover:text-mosk-orange hover:bg-orange-50 dark:hover:bg-slate-800/50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
