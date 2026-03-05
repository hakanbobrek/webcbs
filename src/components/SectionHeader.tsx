import React from 'react';
import { Activity } from 'lucide-react';

interface SectionHeaderProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  badge, 
  title, 
  description, 
  align = 'center',
  className = ''
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col mb-12 ${alignmentClasses[align]} ${className}`}>
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0E1B2B] dark:text-white leading-tight mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-[#F29A5A] rounded-full mb-6"></div>

      {/* Description */}
      {description && (
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
