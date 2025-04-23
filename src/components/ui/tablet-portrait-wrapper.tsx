'use client';

import React, { useEffect, useState, ReactNode } from 'react';

interface TabletPortraitWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TabletPortraitWrapper: React.FC<TabletPortraitWrapperProps> = ({ 
  children, 
  className = '',
  style = {}
}) => {
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);
  
  useEffect(() => {
    const checkTabletPortrait = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      setIsTabletPortrait(isPortrait && isTablet);
    };
    
    // Vérifier immédiatement et lors des changements de taille/orientation
    checkTabletPortrait();
    window.addEventListener('resize', checkTabletPortrait);
    window.addEventListener('orientationchange', checkTabletPortrait);
    
    return () => {
      window.removeEventListener('resize', checkTabletPortrait);
      window.removeEventListener('orientationchange', checkTabletPortrait);
    };
  }, []);
  
  const tabletPortraitStyles: React.CSSProperties = isTabletPortrait ? {
    width: '90%',
    maxWidth: '450px',
    margin: '0 auto',
    display: 'block',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    ...style
  } : style;
  
  return (
    <div 
      className={`tablet-portrait-wrapper ${isTabletPortrait ? 'is-tablet-portrait' : ''} ${className}`}
      style={tabletPortraitStyles}
      data-tablet-portrait={isTabletPortrait}
    >
      {children}
    </div>
  );
};

export default TabletPortraitWrapper; 