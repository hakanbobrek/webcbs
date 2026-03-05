import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, Users, LogOut, LayoutDashboard, Menu, Layers, Newspaper, Briefcase, Share2 } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-mosk-orange">Admin Panel</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Sayfa Ayarları
          </NavLink>
          
          <NavLink 
            to="/admin/managers" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Users className="w-5 h-5 mr-3" />
            Yöneticiler
          </NavLink>

          <NavLink 
            to="/admin/menus" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Menu className="w-5 h-5 mr-3" />
            Menü Yönetimi
          </NavLink>

          <NavLink 
            to="/admin/services" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Layers className="w-5 h-5 mr-3" />
            Hizmet Yönetimi
          </NavLink>

          <NavLink 
            to="/admin/news" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Newspaper className="w-5 h-5 mr-3" />
            Haber Yönetimi
          </NavLink>

          <NavLink 
            to="/admin/news-categories" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Layers className="w-5 h-5 mr-3" />
            Haber Kategorileri
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Referans Yönetimi
            </p>
          </div>

          <NavLink 
            to="/admin/references" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Briefcase className="w-5 h-5 mr-3" />
            Referanslar
          </NavLink>

          <NavLink 
            to="/admin/reference-categories" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Layers className="w-5 h-5 mr-3" />
            Kategoriler
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Sosyal Medya Yönetimi
            </p>
          </div>

          <NavLink 
            to="/admin/social-media" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Share2 className="w-5 h-5 mr-3" />
            Paylaşımlar
          </NavLink>

          <NavLink 
            to="/admin/social-media-categories" 
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-mosk-orange/10 text-mosk-orange' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Layers className="w-5 h-5 mr-3" />
            Kategoriler
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
