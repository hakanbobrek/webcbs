import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface SectionDividerProps {
  position?: 'top' | 'bottom';
  type?: 'wave' | 'curve' | 'tilt' | 'triangle' | 'slant';
  color?: string;
  height?: string;
  className?: string;
  flip?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  position = 'bottom', 
  type = 'wave', 
  color, 
  height = '120px', 
  className = '',
  flip = false
}) => {
  const { isDark } = useTheme();
  
  // Default color logic if not provided
  const fillColor = color || (isDark ? '#1A1A1A' : '#ffffff');
  
  const getPath = () => {
    switch (type) {
      case 'wave':
        return "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";
      case 'curve':
        return "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";
      case 'tilt':
        return "M1200 120L0 16.48 0 0 1200 0 1200 120z";
      case 'triangle':
        return "M1200 0L0 0 598.97 114.72 1200 0z";
      case 'slant':
         return "M0,0 L1440,0 L1440,100 L0,0 Z";
      default:
        return "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";
    }
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    zIndex: 1,
    ...(position === 'top' ? { top: 0, transform: flip ? 'rotate(180deg)' : 'rotate(180deg)' } : { bottom: 0, transform: flip ? 'rotate(180deg)' : 'none' }),
  };

  return (
    <div className={`section-divider ${className}`} style={{ ...style, height }}>
      <svg 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={type === 'curve' ? "0 0 1440 320" : type === 'slant' ? "0 0 1440 100" : "0 0 1200 120"} 
        preserveAspectRatio="none"
        style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '100%' }}
      >
        <path 
          d={getPath()} 
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
