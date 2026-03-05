import React, { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import * as LucideIcons from 'lucide-react';
import { CheckCircle2, Share2, ArrowRight } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import PageTitle from '../components/PageTitle';

interface Service {
  id: number;
  title: string;
  shortTitle?: string;
  shortDescription?: string;
  slug: string;
  icon?: string;
  bgImage?: string;
  content?: string;
  features: string[];
  order: number;
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  if (!name) return null;
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as any)[iconName];
  if (!Icon) return null;
  return <Icon className={className} />;
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const { settings } = useOutletContext<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all services (for sidebar)
        const servicesPromise = axios.get('http://localhost:3001/api/services');
        
        // Fetch specific service detail independently
        const serviceDetailPromise = slug 
          ? axios.get(`http://localhost:3001/api/services/slug/${slug}`)
          : Promise.resolve(null);

        const [servicesRes, serviceDetailRes] = await Promise.all([
          servicesPromise,
          serviceDetailPromise
        ]);
        
        setAllServices(servicesRes.data);
        
        if (serviceDetailRes && serviceDetailRes.data) {
          setService(serviceDetailRes.data);
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
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

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Hizmet Bulunamadı</h2>
        <Link to="/" className="text-mosk-orange hover:underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const currentUrl = window.location.href;
  const shareText = `Check out ${service.title} on ${settings?.siteTitle || 'Mosk Bilişim'}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>{service.title} - {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content={service.shortDescription || service.shortTitle || service.title} />
        <link rel="icon" href={settings?.favicon || '/favicon.svg'} />
        {settings?.appleTouchIcon && <link rel="apple-touch-icon" href={settings.appleTouchIcon} />}
      </Helmet>

      <PageTitle 
        title={service.title}
        breadcrumbs={[
          { label: 'Hizmetler' },
          { label: service.title } // Current page
        ]}
        bgImage={service.bgImage}
        description={service.shortDescription}
      />

      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-zinc-700">
                <div className="w-16 h-16 flex items-center justify-center bg-mosk-orange/10 rounded-2xl text-mosk-orange">
                   {service.icon && <DynamicIcon name={service.icon} className="w-8 h-8" />}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Hizmet Detayları</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{service.shortTitle || service.title}</p>
                </div>
              </div>
              
              <div 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-mosk-orange prose-img:rounded-2xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: service.content || '<p>İçerik hazırlanıyor...</p>' }}
              />
            </div>

            {/* Share Buttons */}
            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-between flex-wrap gap-4 mt-12">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <Share2 size={20} className="text-mosk-orange" />
                Bu Hizmeti Paylaş
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
            
            {/* Other Services List */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-zinc-700/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-zinc-700">
                Diğer Hizmetler
              </h3>
              <div className="space-y-2">
                {allServices.map((s) => (
                  <Link 
                    key={s.id} 
                    to={`/services/${s.slug}`}
                    className={`group flex items-center justify-between p-3 rounded-xl transition-all ${
                      s.slug === slug 
                        ? 'bg-mosk-orange text-white shadow-lg shadow-mosk-orange/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-zinc-700/50 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-medium">{s.title}</span>
                    <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${s.slug === slug ? 'text-white opacity-100' : 'text-mosk-orange'}`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-zinc-700/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-mosk-orange mr-2" />
                  Hizmet Özelliklerimiz
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start p-3 rounded-xl bg-slate-50 dark:bg-zinc-700/50">
                      <div className="w-2 h-2 rounded-full bg-mosk-orange mt-2 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mosk-orange/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Projenizi Hayata Geçirelim</h3>
                <p className="text-slate-300 mb-8 text-sm leading-relaxed">
                  Uzman ekibimizle ihtiyaçlarınızı analiz edelim ve size özel çözümler sunalım.
                </p>
                <Link to="/#contact" className="inline-flex items-center justify-center w-full py-4 bg-mosk-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all hover:scale-105 shadow-lg shadow-orange-500/30">
                  Hemen Teklif Alın
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetailPage;
