import React, { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import * as LucideIcons from 'lucide-react';
import { CheckCircle2, Share2, ArrowRight, Calendar } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import PageTitle from '../components/PageTitle';

interface News {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  bgImage?: string;
  content?: string;
  features?: string[];
  publishedAt: string;
  images?: { id: number; url: string }[];
}

const NewsDetailPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [allNews, setAllNews] = useState<News[]>([]);
  const { settings } = useOutletContext<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const newsPromise = axios.get('http://localhost:3001/api/news');
        
        const newsDetailPromise = slug 
          ? axios.get(`http://localhost:3001/api/news/slug/${slug}`)
          : Promise.resolve(null);
        
        const [newsRes, newsDetailRes] = await Promise.all([
          newsPromise,
          newsDetailPromise
        ]);
        
        setAllNews(newsRes.data);
        
        if (newsDetailRes && newsDetailRes.data) {
          setNews(newsDetailRes.data);
        }
      } catch (err) {
        console.error('Error fetching news details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mosk-orange"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Haber Bulunamadı</h2>
        <Link to="/" className="text-mosk-orange hover:underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const currentUrl = window.location.href;
  const shareText = `Check out ${news.title} on ${settings?.siteTitle || 'Mosk Bilişim'}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>{news.title} - {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content={news.shortDescription || news.title} />
        <link rel="icon" href={settings?.favicon || '/favicon.svg'} />
        {settings?.appleTouchIcon && <link rel="apple-touch-icon" href={settings.appleTouchIcon} />}
      </Helmet>

      <PageTitle 
        title={news.title}
        breadcrumbs={[
          { label: 'Haberler', url: '/news' },
          { label: news.title }
        ]}
        bgImage={news.bgImage}
        description={news.shortDescription}
      />

      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-zinc-700">
                <div className="flex items-center text-mosk-orange bg-mosk-orange/10 px-4 py-2 rounded-lg">
                   <Calendar size={20} className="mr-2" />
                   <span className="font-medium">{new Date(news.publishedAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
              
              <div 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-mosk-orange prose-img:rounded-2xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: news.content || '<p>İçerik hazırlanıyor...</p>' }}
              />
            </div>

            {/* Gallery Section */}
            {news.images && news.images.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-mosk-orange pl-4">
                  Haber Galerisi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {news.images.map((img) => (
                    <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      <img 
                        src={img.url} 
                        alt="Gallery" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onClick={() => window.open(img.url, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-between flex-wrap gap-4 mt-12">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <Share2 size={20} className="text-mosk-orange" />
                Bu Haberi Paylaş
              </div>
              <div className="flex gap-3">
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077b5] text-white hover:opacity-90 transition-opacity"
                  title="Share on LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1da1f2] text-white hover:opacity-90 transition-opacity"
                  title="Share on Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877f2] text-white hover:opacity-90 transition-opacity"
                  title="Share on Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25d366] text-white hover:opacity-90 transition-opacity"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-32 h-fit">
            
            {/* Other News List */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-zinc-700/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-zinc-700">
                Diğer Haberler
              </h3>
              <div className="space-y-2">
                {allNews.map((s) => (
                  <Link 
                    key={s.id} 
                    to={`/news/${s.slug}`}
                    className={`group flex items-center justify-between p-3 rounded-xl transition-all ${
                      s.slug === slug 
                        ? 'bg-mosk-orange text-white shadow-lg shadow-mosk-orange/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-zinc-700/50 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-medium line-clamp-1">{s.title}</span>
                    <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${s.slug === slug ? 'text-white opacity-100' : 'text-mosk-orange'}`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Features (if any) */}
            {news.features && news.features.length > 0 && (
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-zinc-700/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-mosk-orange mr-2" />
                  Öne Çıkanlar
                </h3>
                <ul className="space-y-4">
                  {news.features.map((feature, i) => (
                    <li key={i} className="flex items-start p-3 rounded-xl bg-slate-50 dark:bg-zinc-700/50">
                      <div className="w-2 h-2 rounded-full bg-mosk-orange mt-2 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewsDetailPage;
