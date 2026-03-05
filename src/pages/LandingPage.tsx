import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WhyUsSection from '../components/WhyUsSection';
import NewsSection from '../components/NewsSection';
import ReferencesSection from '../components/ReferencesSection';
import SocialMediaSection from '../components/SocialMediaSection';
import ContactSection from '../components/ContactSection';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';

const LandingPage = () => {
  const { settings } = useOutletContext<any>();

  return (
    <div className="relative">
      <Helmet>
        <title>{settings?.siteTitle || 'Mosk Bilişim'}</title>
        <meta name="description" content={settings?.siteDescription || 'Coğrafi Bilgi Sistemleri'} />
      </Helmet>

      <Hero />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="news">
        <NewsSection />
      </div>
      <div id="references">
        <ReferencesSection />
      </div>
      <div id="social-media">
        <SocialMediaSection />
      </div>
      <div id="why-us">
        <WhyUsSection />
      </div>
      <div id="contact">
        <ContactSection settings={settings} />
      </div>
    </div>
  );
};

export default LandingPage;
