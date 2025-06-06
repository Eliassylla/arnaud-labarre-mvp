'use client'
import Image from 'next/image';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
// import { Check } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { StaticAvatar } from '@/components/ui/static-avatar';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config';

// SVG paths for reference - not animated anymore
const svgPaths = {
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
};

// Default image for avatar
const DEFAULT_AVATAR_IMAGE = '/images/atelier-menuiserie-2.webp';

export default function ClientExperience() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const starIconRef = useRef<SVGSVGElement>(null);
  
  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      
      setIsMobileOrTablet(isSmallScreen);
      setIsPortraitMode(isPortrait);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // GSAP ScrollTrigger animations
  useLayoutEffect(() => {
    // Skip if not client-side
    if (!isClient) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial state for elements to ensure they don't flash
    gsap.set([imageRef.current, headingRef.current, textRef.current, starIconRef.current], { 
      autoAlpha: 0
    });
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", // Start when half of the section enters viewport
          end: "center center",
          toggleActions: "play none none none", // Play on enter, don't restart on re-enter
          once: false, // Allow animation to play again if scrolled away and back
          immediateRender: true, // Force render on page load
        }
      });
      
      // Image animation from left with slight rotation
      tl.fromTo(imageRef.current, 
        { x: -60, y: 30, autoAlpha: 0, rotation: -5 },
        { x: 0, y: 0, autoAlpha: 1, rotation: 0, duration: 1.2, ease: "power2.out" }, 
        0
      );
      
      // Heading and text from right 
      tl.fromTo([headingRef.current, textRef.current], 
        { x: 60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, stagger: 0.2, ease: "power2.out" }, 
        0.3
      );
      
      // Star icon pop with bounce effect
      tl.fromTo(starIconRef.current, 
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.8, ease: "back.out(1.7)" }, 
        0.8
      );
      
      // Add a small delay then refresh ScrollTrigger to ensure it fires on initial load
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      
    }, sectionRef); // Scope to our section element
    
    return () => ctx.revert(); // Cleanup all animations and ScrollTriggers when component unmounts
  }, [isClient, isMobileOrTablet, isPortraitMode]); // Re-run when view mode changes
  
  const isMobilePortrait = isMobileOrTablet && isPortraitMode;
  
  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 lg:py-20 bg-[#F9F6F1] overflow-visible">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Titre "À propos" centré pour toutes les versions */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 lg:mb-14 text-center text-[#3E2F1C]">
            À propos
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 w-full max-w-6xl mx-auto">
          {/* Static Avatar section with single image */}
          <div ref={imageRef} className="flex justify-center w-full mt-4 lg:mt-0 craftsman-image">
            <StaticAvatar 
              src={DEFAULT_AVATAR_IMAGE}
              alt="Photo atelier d'Arnaud Labarre"
              className="relative w-80 h-80 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] overflow-hidden"
              priority={true}
            />
          </div>

          {/* Mobile/tablet portrait order - text first, then avatar */}
          <div className="text-center lg:text-left w-full max-w-md mx-auto px-4 md:px-6 lg:px-10 lg:max-w-xl">
            <h3 ref={headingRef} className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[#3E2F1C] text-center lg:text-left pt-2 lg:leading-tight about-heading">
              Arnaud Labarre crée du mobilier sur mesure en bois noble depuis plus de 20 ans
            </h3>
            {/* N'afficher le paragraphe que sur desktop OU en mode paysage */}
            {(!isMobileOrTablet || !isPortraitMode) && (
              <p ref={textRef} className="text-sm sm:text-base leading-relaxed mb-8 text-[#3E2F1C] text-center lg:text-left max-w-lg mx-auto lg:mx-0 about-text">
                Arnaud Labarre conçoit, restaure et aménage du mobilier en bois noble sur mesure. Chaque pièce allie savoir-faire artisanal et design contemporain pour sublimer votre intérieur.
              </p>
            )}
            
            {/* Simple SVG icon */}
            <div className="flex justify-center lg:justify-start mt-6">
              <svg 
                ref={starIconRef}
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#3E2F1C] star-icon"
              >
                <path d={svgPaths.star} fill="#3E2F1C" />
              </svg>
              <span className="ml-3 text-[#3E2F1C] self-center">Savoir-faire d'exception</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
