'use client'

import Image from 'next/image';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config';

function Feature() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Refs for GSAP animations
  const featureRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<HTMLButtonElement[]>([]);
  
  // Add element to navButtonsRef
  const addToNavButtonsRefs = (el: HTMLButtonElement | null) => {
    if (el && !navButtonsRef.current.includes(el)) {
      navButtonsRef.current.push(el);
    }
  };
  
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
  
  // GSAP animations with ScrollTrigger
  useLayoutEffect(() => {
    // Skip if not client-side
    if (!isClient) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial states to prevent flash
    gsap.set(titleRef.current, { y: 40, autoAlpha: 0 });
    gsap.set(textRef.current, { x: -40, autoAlpha: 0 });
    gsap.set(imageRef.current, { scale: 0.9, autoAlpha: 0 });
    
    if (navButtonsRef.current && navButtonsRef.current.length) {
      gsap.set(navButtonsRef.current, { autoAlpha: 0 });
    }
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Animate the title
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 50%",
          end: "center top",
          toggleActions: "play none none none",
        }
      });
      
      titleTl.to(titleRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Animate the text
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 60%",
          end: "bottom top",
          toggleActions: "play none none none",
        }
      });
      
      textTl.to(textRef.current, {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      });
      
      // Animate the image
      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 65%",
          end: "bottom center",
          toggleActions: "play none none none",
        }
      });
      
      imageTl.to(imageRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out"
      });
      
      // Animate the navigation buttons
      if (navButtonsRef.current && navButtonsRef.current.length) {
        const navButtonsTl = gsap.timeline({
          scrollTrigger: {
            trigger: navButtonsRef.current[0],
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none none",
          }
        });
        
        navButtonsTl.to(navButtonsRef.current, {
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.2,
          delay: 0.9,
          ease: "power1.inOut"
        });
      }
      
      // Refresh ScrollTrigger to ensure proper initialization
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      
    }, featureRef); // Scope to feature section
    
    // Cleanup function
    return () => ctx.revert();
  }, [isClient, navButtonsRef.current?.length]);
  
  const isDesktopLandscape = !isMobileOrTablet;
  
  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };
  
  const images = [
    '/images/real1.webp',
    '/images/real2.webp',
    '/images/real3.webp',
    '/images/real4.webp',
  ];

  return (
  <div ref={featureRef} className="w-full pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-16 lg:pb-20 bg-[#F8F5EF]">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Badge pour les petits écrans en mode paysage uniquement */}
        {isMobileOrTablet && !isPortraitMode && (
          <div className="flex justify-start mb-3">
            <Badge className="bg-[#DEB887] text-black dark:bg-[#5B270B] dark:text-white px-3 py-1 text-sm">
              Atelier
            </Badge>
          </div>
        )}
        
        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-10 lg:mb-14 text-center mx-auto">
          Nos réalisations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <div ref={textRef} className="flex gap-4 flex-col items-center lg:items-start justify-center h-full">
            <div className="flex gap-2 flex-col w-full">
              {isMobileOrTablet ? (
                <>
                  <button 
                    onClick={toggleDescription}
                    className="flex items-center justify-between w-full border border-[#DEB887] bg-[#f3e5d0] px-4 py-3 rounded-md hover:bg-[#ecddc8] transition-colors"
                  >
                    <h3 className="text-xl md:text-2xl tracking-tighter font-regular text-center">
                      Donnez vie à votre intérieur avec un mobilier sur mesure
                    </h3>
                    <ChevronDown 
                      className={`h-5 w-5 ml-2 text-[#3E2F1C] flex-shrink-0 transition-transform duration-200 ${isDescriptionOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isDescriptionOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed tracking-tight text-center text-neutral-700 dark:text-neutral-300 px-4 py-3 bg-[#f8f4ed] rounded-md">
                      Depuis 20 ans, Arnaud Labarre conçoit des meubles d&apos;exception en bois noble, alliant savoir-faire traditionnel et design moderne pour sublimer votre espace.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-center lg:text-left mb-6">
                    Donnez vie à votre intérieur avec un mobilier sur mesure
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-left text-neutral-700 dark:text-neutral-300">
                    Depuis 20 ans, Arnaud Labarre conçoit des meubles d&apos;exception en bois noble, alliant savoir-faire traditionnel et design moderne pour sublimer votre espace.
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div ref={imageRef} className="w-full mt-6 lg:mt-0">
            <Carousel>
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-md aspect-video">
                      <Image
                        src={src}
                        alt={`Réalisation ${index + 1}`}
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious ref={addToNavButtonsRefs} />
              <CarouselNext ref={addToNavButtonsRefs} />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
