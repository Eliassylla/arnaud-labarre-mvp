import { useCallback } from 'react';
import { useSmoothScroll } from '@/lib/gsap/useSmoothScroll';
import { getSectionOffset } from '@/lib/scroll-offsets';

/**
 * Hook that provides a GSAP-powered scroll to section function with per-section offsets
 */
export function useScrollToSection() {
  const { smoothScrollTo } = useSmoothScroll();
  
  /**
   * Scroll to a section with GSAP animation and custom section offset
   * 
   * @param sectionId The ID of the section to scroll to (with or without # prefix)
   * @param options Additional options to customize the scroll behavior
   * @returns True if the scroll was successful, false otherwise
   */
  const scrollToSection = useCallback((
    sectionId: string, 
    options: {
      duration?: number;
      updateUrl?: boolean; 
      onComplete?: () => void;
    } = {}
  ) => {
    if (typeof window === 'undefined') return false;
    
    // Default options
    const { 
      duration = 1, 
      updateUrl = true,
      onComplete
    } = options;
    
    // Clean sectionId to handle both '#section' and 'section' formats
    const cleanSectionId = sectionId.replace(/^#/, '');
    
    // Find target section
    const targetSection = document.getElementById(cleanSectionId);
    
    if (!targetSection) {
      console.warn(`Section with ID "${cleanSectionId}" not found`);
      return false;
    }
    
    // Get the header height
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    
    // Get section-specific offset adjustment (negative = less space below header)
    const sectionOffset = getSectionOffset(cleanSectionId);
    
    // Calculate the final offset by combining header height and section-specific offset
    const finalOffset = -(headerHeight + sectionOffset);
    
    // Use GSAP smooth scroll
    smoothScrollTo({
      targetElement: targetSection,
      offset: finalOffset,
      duration,
      onComplete,
      // Ensure GSAP smoothly animates and respects user interaction
      autoKill: true
    });
    
    // Update URL for anchor links if requested
    if (updateUrl && sectionId.startsWith('#')) {
      window.history.pushState(null, '', sectionId);
    }
    
    return true;
  }, [smoothScrollTo]);
  
  return { scrollToSection };
} 