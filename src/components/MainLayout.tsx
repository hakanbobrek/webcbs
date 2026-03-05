import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3001/api/settings')
      .then(res => setSettings(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="flex flex-col items-center">
          {/* Simple Branded Loader */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-mosk-orange/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-mosk-orange rounded-full border-t-transparent animate-spin"></div>
            {/* Optional: Add Logo inside loader if available */}
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white animate-pulse">MOSK Bilişim</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Helmet>
        <title>{settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content={settings?.siteDescription || 'Coğrafi Bilgi Sistemleri'} />
        <meta name="keywords" content={settings?.siteKeywords || 'CBS, GIS'} />
        {settings?.ogTitle && <meta property="og:title" content={settings.ogTitle} />}
        {settings?.ogDescription && <meta property="og:description" content={settings.ogDescription} />}
        {settings?.ogImage && <meta property="og:image" content={settings.ogImage} />}
        
        {/* Dynamic Favicon & Icons */}
        <link rel="icon" href={settings?.favicon || '/favicon.svg'} />
        {settings?.appleTouchIcon && <link rel="apple-touch-icon" href={settings.appleTouchIcon} />}
        
        {/* Dynamic Font */}
        {settings?.menuFont && settings.menuFont !== 'Inter' && (
          <link href={`https://fonts.googleapis.com/css2?family=${settings.menuFont.replace(/ /g, '+')}:wght@400;500;700&display=swap`} rel="stylesheet" />
        )}
      </Helmet>

      <Navbar settings={settings} />
      
      <main className="flex-grow">
        <Outlet context={{ settings }} />
      </main>

      <Footer settings={settings} />
    </div>
  );
};

export default MainLayout;
