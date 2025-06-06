'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Hammer, TreeDeciduous, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config'
import { useScrollToSection } from '@/hooks/useScrollToSection';

export default function ValueProps() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // Use our custom scroll hook
  const { scrollToSection } = useScrollToSection();
  
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Add element to cardsRef
  const addToCardsRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Responsive handling with debounced resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    
    function handleResize() {
      setIsMobileOrTablet(window.innerWidth < 768);
    }
    
    // Initial check
    handleResize();
    
    // Add debounced event listener
    function debouncedResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    }
    
    window.addEventListener("resize", debouncedResize);
    
    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // GSAP animations with ScrollTrigger
  useLayoutEffect(() => {
    // Skip if not client-side
    if (!isClient) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial state to prevent flash
    if (cardsRef.current && cardsRef.current.length) {
      gsap.set(cardsRef.current, { y: 50, autoAlpha: 0 });
    }
    
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 30, autoAlpha: 0 });
    }
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Animate the cards with stagger
      if (cardsRef.current && cardsRef.current.length) {
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "center center",
            toggleActions: "play none none none",
          }
        });
        
        cardsTl.to(cardsRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
      
      // Animate the CTA button
      if (ctaRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "40% 60%",
            end: "bottom center",
            toggleActions: "play none none none",
          }
        });
        
        ctaTl.to(ctaRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out"
        });
      }
      
      // Refresh ScrollTrigger to ensure proper initialization
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      
    }, sectionRef); // Scope to section
    
    // Cleanup function
    return () => ctx.revert();
  }, [isClient, cardsRef.current?.length]);

  // Use our new scroll hook
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('services');
  };

  return (
    <section ref={sectionRef} className="bg-[#f8f5ef] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8 lg:mb-12">
          Mes Atouts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8 lg:mt-10">
          {/* Card 1 */}
          <div 
            ref={addToCardsRefs}
            className="valueprop-card bg-[#f3e5d0] shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden p-4 md:p-6 border border-[#C17E6A]"
          >
            <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-md bg-[#a55b53] text-white mb-4 md:mb-5 mx-auto">
              <Hammer size={20} className="md:hidden" />
              <Hammer size={24} className="hidden md:block" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center text-[#3E2F1C] mb-2 md:mb-3">Savoir-faire traditionnel</h3>
            <p className="text-center text-sm md:text-base text-[#5f5b53]">
              Plus de 20 ans d'expérience dans la création de mobilier sur mesure en utilisant des techniques traditionnelles d'ébénisterie.
            </p>
          </div>
          
          {/* Card 2 */}
          <div 
            ref={addToCardsRefs}
            className="valueprop-card bg-[#f3e5d0] shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden p-4 md:p-6 border border-[#C17E6A]"
          >
            <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-md bg-[#a55b53] text-white mb-4 md:mb-5 mx-auto">
              <TreeDeciduous size={20} className="md:hidden" />
              <TreeDeciduous size={24} className="hidden md:block" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center text-[#3E2F1C] mb-2 md:mb-3">Matériaux nobles</h3>
            <p className="text-center text-sm md:text-base text-[#5f5b53]">
              Sélection minutieuse des meilleurs bois et matériaux pour garantir la durabilité et l'élégance de chaque création.
            </p>
          </div>
          
          {/* Card 3 */}
          <div 
            ref={addToCardsRefs}
            className="valueprop-card bg-[#f3e5d0] shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden p-4 md:p-6 border border-[#C17E6A]"
          >
            <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-md bg-[#a55b53] text-white mb-4 md:mb-5 mx-auto">
              <Edit3 size={20} className="md:hidden" />
              <Edit3 size={24} className="hidden md:block" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center text-[#3E2F1C] mb-2 md:mb-3">Personnalisation</h3>
            <p className="text-center text-sm md:text-base text-[#5f5b53]">
              Chaque projet est unique et créé sur mesure pour répondre parfaitement à vos besoins et s'intégrer harmonieusement à votre espace.
            </p>
          </div>
        </div>
        
        <div ref={ctaRef} className="text-center mt-8 md:mt-12">
          <Link href="#services" onClick={handleScrollToServices}>
            <Button className="cursor-pointer bg-[#f3e5d0] text-[#3E2F1C] hover:bg-[#ecddc8] border border-[#C17E6A] devis-button">
              Demander un devis gratuit
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}