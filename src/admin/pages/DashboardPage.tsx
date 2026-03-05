import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, 
  FileText, 
  Menu, 
  Share2, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Lock 
} from 'lucide-react';

interface LoginLog {
  id: number;
  username: string;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE' | 'LOCKED';
  createdAt: string;
}

interface DashboardStats {
  counts: {
    services: number;
    menus: number;
    news: number;
    posts: number;
  };
  apiStatus: string;
  recentLogins: LoginLog[];
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/dashboard/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mosk-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Panel Özeti</h1>
        <p className="text-gray-500 dark:text-gray-400">Sistem durumu ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Toplam Hizmet" 
          value={stats?.counts.services || 0} 
          icon={<FileText className="w-6 h-6 text-blue-500" />}
          color="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatsCard 
          title="Menü Öğesi" 
          value={stats?.counts.menus || 0} 
          icon={<Menu className="w-6 h-6 text-purple-500" />}
          color="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatsCard 
          title="Haber / Duyuru" 
          value={stats?.counts.news || 0} 
          icon={<Users className="w-6 h-6 text-green-500" />}
          color="bg-green-50 dark:bg-green-900/20"
        />
        <StatsCard 
          title="Sosyal Medya" 
          value={stats?.counts.posts || 0} 
          icon={<Share2 className="w-6 h-6 text-orange-500" />}
          color="bg-orange-50 dark:bg-orange-900/20"
        />
      </div>

      {/* API Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stats?.apiStatus === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Durumu</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Backend servisi şu an {stats?.apiStatus === 'Active' ? 'aktif ve çalışıyor' : 'devre dışı'}
              </p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            stats?.apiStatus === 'Active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {stats?.apiStatus === 'Active' ? 'Aktif' : 'Pasif'}
          </div>
        </div>
      </div>

      {/* Login Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Giriş Hareketleri</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Yönetici paneli giriş denemeleri</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Kullanıcı</th>
                <th className="px-6 py-3 font-medium">Durum</th>
                <th className="px-6 py-3 font-medium">IP Adresi</th>
                <th className="px-6 py-3 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stats?.recentLogins.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {log.username}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.status === 'SUCCESS' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : log.status === 'LOCKED'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {log.status === 'SUCCESS' && <CheckCircle className="w-3 h-3" />}
                      {log.status === 'FAILURE' && <XCircle className="w-3 h-3" />}
                      {log.status === 'LOCKED' && <Lock className="w-3 h-3" />}
                      <span>
                        {log.status === 'SUCCESS' ? 'Başarılı' : log.status === 'LOCKED' ? 'Kilitlendi' : 'Hatalı'}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {new Date(log.createdAt).toLocaleString('tr-TR')}
                  </td>
                </tr>
              ))}
              {stats?.recentLogins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Henüz kayıt bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      {icon}
    </div>
  </div>
);

export default DashboardPage;
