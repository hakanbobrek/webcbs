import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  url?: string;
}

interface PageTitleProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  bgImage?: string;
  description?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbs, bgImage, description }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden flex items-center min-h-[40vh]">
      {/* Background Image */}
      {bgImage ? (
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-slate-900 z-0">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mosk-orange/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-slate-400 mb-6 flex-wrap">
            <Link to="/" className="flex items-center hover:text-white transition-colors">
              <Home size={16} className="mr-2" />
              Ana Sayfa
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight size={14} className="mx-2 text-slate-600" />
                {crumb.url ? (
                  <Link to={crumb.url} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-mosk-orange">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
