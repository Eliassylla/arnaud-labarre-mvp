'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap/gsap-config';

// Définir une interface pour ScrollSmoother
interface ScrollSmoother {
  scrollTop: (position: number) => void;
  kill: () => void;
  progress: number;
}

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
  smoothness?: number;
  speed?: number;
  enabled?: boolean;
  smoothTouch?: boolean | number;
  effects?: boolean;
  effectsPrefix?: string;
  effectsPadding?: number | string | ((index: number, el: Element) => number | string);
}

/**
 * SmoothScrollWrapper provides smooth scrolling functionality using GSAP ScrollSmoother
 * Wrap your content with this component to enable smooth scrolling
 */
export function SmoothScrollWrapper({
  children,
  smoothness = 1,
  speed = 1,
  enabled = true,
  smoothTouch = 0.8,
  effects = false,
  effectsPrefix = 'speed',
  effectsPadding
}: SmoothScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Only run on the client side
    if (!isClient || !enabled) return;
    
    // Get references to our elements
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    
    if (!wrapper || !content) return;
    
    // Import ScrollSmoother dynamically (since it's not available in SSR)
    const initSmoother = async () => {
      try {
        // Use dynamic import to ensure this only runs on the client
        const { ScrollSmoother } = await import('gsap/ScrollSmoother');
        
        // Make sure ScrollSmoother is registered
        if (!ScrollSmoother) {
          console.warn('ScrollSmoother is not available');
          return;
        }
        
        // Register the plugin just in case it wasn't registered in gsap-config
        if (typeof window !== 'undefined') {
          gsap.registerPlugin(ScrollSmoother);
        }
        
        // Create a scroll smoother instance with options from the source code
        const smootherInstance = ScrollSmoother.create({
          wrapper: wrapper,
          content: content,
          smooth: smoothness, 
          speed: speed,
          normalizeScroll: true, // Prevents jarring scrollbar behavior
          ignoreMobileResize: true, // Prevents scroll issues on mobile 
          smoothTouch: smoothTouch,
          effects: effects ? `[data-${effectsPrefix}], [data-${effectsPrefix}-lag]` : false,
          effectsPrefix: effectsPrefix,
          // @ts-expect-error - GSAP accepte plusieurs types pour effectsPadding
          effectsPadding: effectsPadding
        });
        
        setSmoother(smootherInstance);
      } catch (error) {
        console.error('Error initializing ScrollSmoother:', error);
      }
    };
    
    initSmoother();
    
    // Clean up
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, [isClient, smoothness, speed, enabled, smoothTouch, effects, effectsPrefix, effectsPadding, smoother]);
  
  // If rendering on server or first client render, just show children
  if (!isClient) {
    return <>{children}</>;
  }
  
  return (
    <>
      <div 
        ref={wrapperRef} 
        className="smooth-wrapper" 
        style={{ 
          position: 'fixed', 
          width: '100%', 
          height: '100%', 
          top: 0,
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: !isClient ? 0 : 1, // Hide during SSR
          transition: 'opacity 0.2s ease-out'
        }}
      >
        <div 
          ref={contentRef} 
          className="smooth-content"
          style={{ 
            pointerEvents: 'all' 
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}