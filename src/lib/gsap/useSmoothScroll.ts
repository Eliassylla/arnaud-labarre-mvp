import { useEffect, useCallback } from 'react';
import { gsap, ScrollToPlugin } from './gsap-config';

interface SmoothScrollOptions {
  targetId?: string;
  targetElement?: HTMLElement;
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  duration?: number;
  ease?: string;
  position?: string; // "top center", "center center", etc.
  onStart?: () => void;
  onComplete?: () => void;
  onInterrupt?: () => void;
  container?: HTMLElement | Window; // Scroll container
  autoKill?: boolean; // Stop scrolling animation on user interaction
}

/**
 * Hook to handle smooth scrolling using GSAP ScrollToPlugin
 * Based on features found in the GSAP ScrollToPlugin source code
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Ensure ScrollToPlugin is registered - this is a safety check
    if (typeof window !== 'undefined') {
      // Check if the plugin exists using a type-safe approach
      let isScrollToRegistered = false;
      try {
        // @ts-expect-error - Checking if the plugin is registered in a runtime-safe way
        isScrollToRegistered = !!gsap.plugins?.scrollTo || !!gsap.core.getCache('scrollTo');
      } catch {  // Ignorer l'erreur sans utiliser la variable
        // Ignore error
      }
      
      if (!isScrollToRegistered) {
        gsap.registerPlugin(ScrollToPlugin);
      }
    }
  }, []);

  /**
   * Smoothly scroll to an element
   */
  const smoothScrollTo = useCallback((options: SmoothScrollOptions = {}) => {
    const { 
      targetId, 
      targetElement, 
      offset = 0,
      offsetX = 0,
      offsetY = offset, // If only offset is provided, use it for Y
      duration = 1, 
      ease = 'power2.inOut',
      // position = 'top top', // Variable non utilisée
      onStart,
      onComplete,
      onInterrupt,
      container = window,
      autoKill = true
    } = options;
    
    if (!targetId && !targetElement) return;
    
    // Get target element
    const element = targetElement || (targetId ? document.getElementById(targetId) : null);
    if (!element) return;
    
    // Handle scrolling
    gsap.to(container, {
      duration,
      scrollTo: {
        y: element,
        offsetY,
        x: offsetX ? element : undefined,
        offsetX,
        autoKill,
        onAutoKill: onInterrupt
      },
      ease,
      onStart,
      onComplete
    });
  }, []);

  /**
   * Scroll to specific coordinates
   */
  const scrollToPosition = useCallback((options: {
    x?: number;
    y?: number;
    duration?: number;
    ease?: string;
    onComplete?: () => void;
  }) => {
    const { x, y, duration = 1, ease = 'power2.inOut', onComplete } = options;
    
    gsap.to(window, {
      duration,
      scrollTo: { y, x, autoKill: true },
      ease,
      onComplete
    });
  }, []);

  /**
   * Scroll to the top of the page
   */
  const scrollToTop = useCallback((duration = 1, onComplete?: () => void) => {
    gsap.to(window, {
      duration,
      scrollTo: { y: 0, autoKill: true },
      ease: 'power2.inOut',
      onComplete
    });
  }, []);

  /**
   * Scroll horizontally
   */
  const scrollHorizontal = useCallback((
    x: number | Element | string,
    options: Omit<SmoothScrollOptions, 'targetElement' | 'targetId'> = {}
  ) => {
    const { 
      duration = 1, 
      ease = 'power2.inOut',
      offsetX = 0,
      onComplete,
      autoKill = true
    } = options;
    
    gsap.to(window, {
      duration,
      scrollTo: { x, offsetX, autoKill },
      ease,
      onComplete
    });
  }, []);

  return { 
    smoothScrollTo, 
    scrollToPosition,
    scrollToTop,
    scrollHorizontal
  };
}