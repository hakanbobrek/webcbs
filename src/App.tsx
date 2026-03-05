import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './admin/context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

import MainLayout from './components/MainLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PublicNewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ReferencesListPage from './pages/ReferencesListPage';
import SocialMediaPage from './pages/SocialMediaPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLayout from './admin/components/AdminLayout';
import LoginPage from './admin/pages/LoginPage';
import DashboardPage from './admin/pages/DashboardPage';
import SettingsPage from './admin/pages/SettingsPage';
import ManagersPage from './admin/pages/ManagersPage';
import MenuPage from './admin/pages/MenuPage';
import ServicesPage from './admin/pages/ServicesPage';
import ServiceEditorPage from './admin/pages/ServiceEditorPage';
import AdminNewsPage from './admin/pages/NewsPage';
import NewsEditorPage from './admin/pages/NewsEditorPage';
import NewsCategoriesPage from './admin/pages/NewsCategoriesPage';
import ReferencesPage from './admin/pages/ReferencesPage';
import ReferenceEditorPage from './admin/pages/ReferenceEditorPage';
import ReferenceCategoriesPage from './admin/pages/ReferenceCategoriesPage';
import SocialMediaCategoriesPage from './admin/pages/SocialMediaCategoriesPage';
import SocialMediaPostsPage from './admin/pages/SocialMediaPostsPage';
import SocialMediaPostEditorPage from './admin/pages/SocialMediaPostEditorPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router basename="/moskbilisim">
          <Routes>
            {/* Public Routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/news" element={<PublicNewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />
              <Route path="/references" element={<ReferencesListPage />} />
              <Route path="/social-media" element={<SocialMediaPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="managers" element={<ManagersPage />} />
              <Route path="menus" element={<MenuPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/new" element={<ServiceEditorPage />} />
              <Route path="services/edit/:id" element={<ServiceEditorPage />} />
              <Route path="news" element={<AdminNewsPage />} />
              <Route path="news/new" element={<NewsEditorPage />} />
              <Route path="news/edit/:id" element={<NewsEditorPage />} />
              <Route path="news-categories" element={<NewsCategoriesPage />} />
              <Route path="references" element={<ReferencesPage />} />
              <Route path="references/new" element={<ReferenceEditorPage />} />
              <Route path="references/edit/:id" element={<ReferenceEditorPage />} />
              <Route path="reference-categories" element={<ReferenceCategoriesPage />} />
              <Route path="social-media" element={<SocialMediaPostsPage />} />
              <Route path="social-media/new" element={<SocialMediaPostEditorPage />} />
              <Route path="social-media/edit/:id" element={<SocialMediaPostEditorPage />} />
              <Route path="social-media-categories" element={<SocialMediaCategoriesPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
