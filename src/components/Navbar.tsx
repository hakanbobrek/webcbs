import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu as MenuIcon, X, Moon, Sun, ChevronDown, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import moskLogoYan from '../assets/MoskLogoYan-01.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface MenuItem {
  id: number;
  title: string;
  slug: string;
  url?: string;
  icon?: string;
  order: number;
  parentId: number | null;
  children?: MenuItem[];
}

const buildTree = (items: MenuItem[]) => {
  const map = new Map<number, MenuItem>();
  const roots: MenuItem[] = [];
  
  // Clone items to avoid mutating original array references if reused
  items.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });
  
  items.forEach(item => {
    if (item.parentId) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children?.push(map.get(item.id)!);
      }
    } else {
      roots.push(map.get(item.id)!);
    }
  });
  
  const sortItems = (list: MenuItem[]) => {
    list.sort((a, b) => a.order - b.order);
    list.forEach(i => {
      if (i.children) sortItems(i.children);
    });
  };
  
  sortItems(roots);
  return roots;
};

const DynamicIcon = ({ name }: { name: string }) => {
  if (!name) return null;
  // Capitalize first letter just in case user typed "home" instead of "Home"
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as any)[iconName];
  if (!Icon) return null;
  return <Icon size={16} className="mr-2 inline-block" />;
};

const Navbar = ({ settings }: { settings?: any }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [mobileExpanded, setMobileExpanded] = useState<Record<number, boolean>>({});
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = settings?.logoUrl;
  const menuFont = settings?.menuFont || 'Outfit';
  const menuMaxWidth = settings?.menuMaxWidth || '1280px';
  const logoHeight = settings?.logoHeight || '80px';
  const navbarHeight = settings?.navbarHeight || '80px';
  const menuFontSize = settings?.menuFontSize || '14px';
  const submenuFontSize = settings?.submenuFontSize || '14px';

  useEffect(() => {
    axios.get('http://localhost:3001/api/menus')
      .then(res => {
        const tree = buildTree(res.data);
        setMenuItems(tree);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const toggleMobileSubmenu = (id: number) => {
    setMobileExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderDesktopMenu = (items: MenuItem[], level = 0) => {
    return (
      <div className={level === 0 ? "flex items-center space-x-6" : "absolute top-0 left-full w-48 bg-white dark:bg-mosk-dark shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"}>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          return (
            <div key={item.id} className={`relative group ${level === 0 ? '' : 'px-2'}`}>
              <a
                href={item.url || (item.slug ? `#${item.slug}` : '#')}
                className={`flex items-center ${level === 0 
                  ? `${(isHomePage || isScrolled) ? 'text-mosk-secondary dark:text-slate-300' : 'text-white drop-shadow-md'} hover:text-mosk-orange dark:hover:text-mosk-orange font-medium transition-colors py-8` 
                  : 'block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md w-full font-medium'}`}
                style={{ fontSize: level === 0 ? menuFontSize : submenuFontSize }}
              >
                {item.icon && <DynamicIcon name={item.icon} />}
                {item.title}
                {hasChildren && (
                  level === 0 
                    ? <ChevronDown size={14} className="ml-1" />
                    : <ChevronRight size={14} className="ml-auto" />
                )}
                {level === 0 && <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-mosk-orange transition-all group-hover:w-full"></span>}
              </a>

              {/* Submenu */}
              {hasChildren && (
                <div className={level === 0 
                  ? "absolute top-full left-0 w-56 bg-white dark:bg-mosk-dark shadow-xl rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 border border-gray-100 dark:border-gray-800" 
                  : "" // For deeper levels, handled by recursion logic if we wanted deep nesting support
                }>
                  {/* For level 0 children, just map them. For deeper, we could recurse but simple dropdown is usually 1 level deep for standard headers */}
                  {item.children!.map(child => (
                    <a 
                      key={child.id} 
                      href={child.url || (child.slug ? `#${child.slug}` : '#')}
                      className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-mosk-orange dark:hover:text-mosk-orange hover:bg-orange-50 dark:hover:bg-gray-800/50 transition-colors font-medium"
                      style={{ fontSize: submenuFontSize }}
                    >
                      {child.icon && <DynamicIcon name={child.icon} />}
                      {child.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMobileMenu = (items: MenuItem[], level = 0) => {
    return (
      <div className="space-y-1">
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          return (
            <div key={item.id} className="w-full">
              <div className="flex items-center justify-between group">
                {/* 
                  Eğer alt menüsü varsa, ana başlığa tıklanınca sadece menüyü açıp kapatmalı (toggle).
                  Eğer alt menüsü yoksa, linke gitmeli.
                */}
                <div 
                  className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer
                    ${level === 0 ? 'text-mosk-secondary dark:text-slate-300' : 'text-slate-600 dark:text-slate-400 text-sm'}
                    hover:text-mosk-orange dark:hover:text-mosk-orange hover:bg-orange-50 dark:hover:bg-slate-800/50
                  `}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      toggleMobileSubmenu(item.id);
                    } else {
                      setIsOpen(false);
                      // Navigate manually if needed or let the anchor tag handle it if we wrap it differently
                      // Here we are using a div with onClick, so we need to handle navigation if it's a link
                      if (item.url || item.slug) {
                         window.location.href = item.url || (item.slug ? `#${item.slug}` : '#');
                      }
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <DynamicIcon name={item.icon} />}
                    {item.title}
                  </div>
                  
                  {hasChildren && (
                    <div className="text-gray-400">
                      {mobileExpanded[item.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Submenu Content */}
              <AnimatePresence>
                {hasChildren && mobileExpanded[item.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 border-l-2 border-gray-100 dark:border-gray-800 ml-4 mt-1 space-y-1">
                      {renderMobileMenu(item.children!, level + 1)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <nav 
      style={{ fontFamily: menuFont }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b
        ${isHomePage 
          ? 'bg-white/80 dark:bg-mosk-dark/90 backdrop-blur-xl border-mosk-grey/10' 
          : isScrolled
            ? 'bg-white/80 dark:bg-mosk-dark/90 backdrop-blur-xl border-mosk-grey/10'
            : 'bg-transparent backdrop-blur-[2px] border-transparent'}`}
    >
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: menuMaxWidth }}
      >
        <div className="flex items-center justify-between" style={{ height: navbarHeight }}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <img 
              src={logoUrl || moskLogoYan} 
              alt="Mosk Bilişim" 
              style={{ height: logoHeight, width: 'auto' }}
              className="object-contain" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center">
              {renderDesktopMenu(menuItems)}
              
              <div className="h-6 w-px bg-mosk-grey/20 dark:bg-mosk-grey/20 mx-4"></div>

              <button
                className="mr-3 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-mosk-secondary dark:text-slate-300 font-bold text-xs w-10 h-10 flex items-center justify-center"
                aria-label="Language"
              >
                TR
              </button>

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
          <div className="md:hidden flex items-center gap-3">
            <button
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs w-9 h-9 flex items-center justify-center"
              aria-label="Language"
            >
              TR
            </button>
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
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
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
            <div className="px-4 pt-4 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {renderMobileMenu(menuItems)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
