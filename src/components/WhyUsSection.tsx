import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Cpu, Headset } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-mosk-orange" />,
    title: "Yeni Nesil Teknolojiler",
    description: "Dünyaca kabul görmüş, yeni nesil teknolojiler ile üretim yapıyoruz. 16 yıllık Bilişim Sektörü tecrübemiz ile geliştirdiğimiz ürünlerimiz, kurumlara kesintisiz erişim, verimlilik, yönetilebilirlik ve her aşamasında dikkat ettiğimiz güvenlik sağlıyor."
  },
  {
    icon: <Layers className="w-6 h-6 text-mosk-orange" />,
    title: "Bütünleşik Çözümler",
    description: "Bilginin bir yerden girilip, yetki dahilinde her yerden kullanılabildiği, mükerrer bilgi girişini engelleyen bütünleşik çözümler üretiyoruz. Özel olarak geliştirdiğimiz Mobil Uygulamalar ile destekliyor, bu sayede zamandan ve mekandan bağımsız kesintisiz erişim imkanı sunuyoruz."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-mosk-orange" />,
    title: "DİJİTAL DÖNÜŞÜM",
    description: "Sunduğumuz Ürün ve Hizmetler ile Kurumların Dijital Dönüşümüne katkı koyuyoruz. Tümüyle yenilikçi projeler üretmeye odaklı takımımız ile modüler, hızlı, güvenli, yönetim ve bakım maliyeti düşük yazılım çözümleri üretiyoruz."
  },
  {
    icon: <Headset className="w-6 h-6 text-mosk-orange" />,
    title: "KESİNTİSİZ VE UZMAN DESTEK",
    description: "Alanında Uzman ekiplerimiz ve koşulsuz müşteri memnuniyeti felsefemiz ile her an yanınızdayız. Projelerimizde üretimini gerçekleştirdiğimiz ürünlerimizin yüzde yüz müşteri memnuniyeti ile istediğimiz hedeflere ulaşabileceğinin bilincindeyiz."
  }
];

const WhyUsSection = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative py-24 bg-slate-900 dark:bg-zinc-900 overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Neden <span className="text-mosk-orange">Biz?</span>
              </h2>
              <div className="w-20 h-1 bg-mosk-orange rounded-full mb-8"></div>
            </motion.div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group bg-slate-800/50 dark:bg-zinc-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-mosk-orange backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 p-2 bg-mosk-orange/10 rounded-lg group-hover:bg-mosk-orange/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-mosk-orange transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-300 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/50 dark:border-zinc-700">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Mosk Bilişim Vizyonu" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-slate-800 dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-slate-700 dark:border-zinc-700 z-10"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-white text-sm">7/24 Kesintisiz Hizmet</span>
              </div>
            </motion.div>
            
            {/* Background Decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-mosk-orange/10 rounded-full blur-3xl"></div>
          </motion.div>

        </div>
      </div>
      
    </section>
  );
};

export default WhyUsSection;
