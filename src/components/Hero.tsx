'use client'

import { Charm } from "next/font/google";
const charm = Charm({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

import Image from 'next/image'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import type { CSSProperties } from 'react'
import { PhoneMenu } from "@/components/ui/phone-menu";
import { TextReveal } from '@/components/animation/TextReveal';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config';

// Define simple inline style to ensure elements are hidden initially
const initialHiddenStyle: CSSProperties = { 
  opacity: 0
};

export default function Hero() {
  // Refs for animation targets
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [isClient, setIsClient] = useState(false);
  
  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // GSAP Animation with useLayoutEffect for smoother animations
  useLayoutEffect(() => {
    // Only run animations on client side
    if (!isClient) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a GSAP context to ensure proper cleanup
    const ctx = gsap.context(() => {
      
      // First, make the hero section visible and set initial states
      gsap.set(heroRef.current, { autoAlpha: 1 });
      gsap.set(heroContentRef.current, { autoAlpha: 0 });
      gsap.set(bgRef.current, { autoAlpha: 0, scale: 1.1 });
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(taglineRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
      
      // Shared timeline creation function to avoid code duplication
      const createHeroAnimation = (scale = 1) => {
        const tl = gsap.timeline({ 
          defaults: { ease: "power2.out" },
          onStart: () => {
            if (typeof document !== 'undefined') {
              document.body.classList.add('js-loaded');
            }
          }
        });
        
        // Background image animation - slower on desktop, faster on mobile
        tl.to(bgRef.current, { 
          autoAlpha: 1, 
          scale: 1,
          duration: scale === 1 ? 2.5 : 1.8 
        }, 0);
        
        // Overlay fade in
        tl.to(overlayRef.current, { 
          autoAlpha: 0.6, 
          duration: scale === 1 ? 1.8 : 1.2
        }, 0);
        
        // Content container fade in
        tl.to(heroContentRef.current, { 
          autoAlpha: 1, 
          duration: 0.5 
        }, 0.2);
        
        // Note: Title text animation is handled by TextReveal component
        
        // Tagline reveal
        tl.to(taglineRef.current, { 
          autoAlpha: 1, 
          y: 0, 
          duration: scale === 1 ? 1 : 0.7
        }, scale === 1 ? 0.8 : 0.6);
        
        // CTA button reveal
        tl.to(ctaRef.current, { 
          autoAlpha: 1, 
          y: 0, 
          duration: scale === 1 ? 0.8 : 0.6, 
          ease: "back.out(1.2)" 
        }, scale === 1 ? 1.2 : 0.9);
        
        return tl;
      };
      
      // Use ScrollTrigger.matchMedia to set up responsive animations
      ScrollTrigger.matchMedia({
        // Mobile specific animations
        "(max-width: 767px)": function() {
          // Mobile animations - faster and simpler
          createHeroAnimation(0.7);
        },
        
        // Tablet specific animations
        "(min-width: 768px) and (max-width: 1023px)": function() {
          // Tablet animations - moderate timing and scale
          createHeroAnimation(0.85);
        },
        
        // Desktop specific animations
        "(min-width: 1024px)": function() {
          // Desktop animations - full timing and scale
          const tl = createHeroAnimation(1);
          
          // Desktop can have additional effects like parallax
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              // Subtle parallax effect for background
              gsap.to(bgRef.current, {
                yPercent: self.progress * 15,
                ease: "none",
                overwrite: "auto",
                duration: 0.1
              });
            }
          });
        }
      });
      
    }, heroRef); // Scope to hero container
    
    // Return cleanup function to prevent memory leaks
    return () => ctx.revert();
  }, [isClient]); // Only re-run if isClient changes
  
  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[700px] pb-6 md:pb-8" style={initialHiddenStyle}>
      {/* Background image */}
      <div className="absolute inset-0 hero-bg">
        <Image
          ref={bgRef}
          src="/images/atelier-menuiserie-4.webp"
          alt="Atelier de menuiserie d'Arnaud Labarre"
          fill
          className="object-cover"
          priority
        />
        <div 
          ref={overlayRef} 
          className="absolute inset-0 bg-black/60 hero-bg-overlay"
          style={initialHiddenStyle}
        />
      </div>
      
      {/* Centered content */}
      <div 
        ref={heroContentRef}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center xl:items-start justify-center h-full text-center xl:text-left text-white"
        style={initialHiddenStyle}
      >
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-center xl:text-left hero-title ${charm.className}`}
        >
          {isClient ? (
            <TextReveal 
              text="Arnaud Labarre"
              delay={0.5}
              duration={0.1}
              stagger={0.05}
              splitBy="chars"
            />
          ) : (
            "Arnaud Labarre"
          )}
        </h1>
        <p 
          ref={taglineRef}
          className="max-w-2xl mb-6 md:mb-8 leading-relaxed italic text-base md:text-lg text-center xl:text-left hero-subtitle"
        >
          Mobilier d&apos;exception en bois noble façonné sur mesure pour sublimer votre intérieur.
        </p>
        <div 
          ref={ctaRef}
          className="mt-4 bg-black/30 backdrop-blur-sm rounded-lg px-5 py-3 hero-cta"
        >
          <PhoneMenu />
        </div>
      </div>
    </section>
  )
}