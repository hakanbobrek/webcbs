import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Smartphone, Globe, Database, Layers, 
  Cpu, Wifi, PenTool, Zap, Target, Users, Award 
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SectionDivider from '../components/SectionDivider';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import axios from 'axios';

const ValueCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-mosk-orange to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-mosk-orange/30">
        <Icon className="text-white" size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const AboutPage = () => {
  const { isDark } = useTheme();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/settings')
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-mosk-dark transition-colors duration-500">
      <Helmet>
        <title>Hakkımızda | {settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content="Mosk Bilişim; genç, dinamik ve inovatif kadrosuyla CBS, Yazılım ve Akıllı Şehir çözümleri sunmaktadır." />
      </Helmet>

      <PageTitle 
        title="Hakkımızda"
        breadcrumbs={[{ label: 'Hakkımızda' }]}
        description="Tecrübe ve enerjinin birleştiği noktada, geleceğin teknolojilerini bugünden inşa ediyoruz."
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
      />

      {/* Main Content Split */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  MOSK Bilişim <span className="text-mosk-orange">Teknolojileri</span>
                </h2>
                <div className="w-20 h-1 bg-mosk-orange rounded-full"></div>
              </div>
              
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                <p>
                  MOSK Bilişim Teknolojileri; Bilgi Sistemleri, Proje Yönetimi ve Yazılım alanındaki köklü tecrübelerini birleştiren uzman bir ekibin enerjisi ve inancı ile kurulmuştur.
                </p>
                <p>
                  Genç, Dinamik ve İnovatif düşünen mühendis kadromuz ile coğrafyanın ötesine tecrübemizi ve vizyonumuzu taşımayı ulusal bir sorumluluk olarak benimsedik. Çoklu disipline sahip yapımızla, nitelikli projeler ve özel çözümler üreterek hizmet verdiğimiz sektörlere katma değer sağlamaya devam ediyoruz.
                </p>
              </div>

              {/* Slogan Box */}
              <div className="bg-mosk-orange/10 border-l-4 border-mosk-orange p-6 rounded-r-xl">
                <div className="flex items-center gap-3 mb-2">
                  <PenTool className="text-mosk-orange" size={24} />
                  <span className="text-sm font-bold uppercase text-mosk-orange tracking-widest">Felsefemiz</span>
                </div>
                <p className="text-2xl font-black text-slate-800 dark:text-white italic">
                  "Bilişim’de Sanat"
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Her projeye sadece bir iş değil, kalıcı bir eser olarak bakıyoruz.
                </p>
              </div>
            </motion.div>

            {/* Right: Visual/Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-700 aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80" 
                  alt="Mosk Bilişim Ekibi" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              
              {/* Floating Stat Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-zinc-700 max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">16+ Yıl</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Sektör Tecrübesi</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-zinc-900 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={Users} 
              title="Genç & Dinamik" 
              description="Enerjisi yüksek, sürekli öğrenen ve gelişen bir ekip yapısı."
              delay={0.1}
            />
            <ValueCard 
              icon={Cpu} 
              title="İnovatif Yaklaşım" 
              description="Teknolojiyi takip eden değil, teknolojiye yön veren çözümler."
              delay={0.2}
            />
            <ValueCard 
              icon={Target} 
              title="Ulusal Sorumluluk" 
              description="Coğrafyanın ötesine taşınan vizyon ve yerli üretim bilinci."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <ServicesSection />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </div>
  );
};

export default AboutPage;
