"use client"

import { useState, useEffect, useRef, RefCallback, useLayoutEffect } from "react"
import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/login-form"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config'
import { ChevronDown } from "lucide-react"

interface Feature {
  step: string;
  title: string;
  content: string;
  image: string;
}

const services: Feature[] = [
  {
    step: "01",
    title: "Mobilier personnalisé haut de gamme",
    content: "Création de meubles uniques en bois noble, pensés pour s'adapter parfaitement à votre intérieur.",
    image: "/images/service-mobilier.jpg",
  },
  {
    step: "02",
    title: "Restauration & rénovation",
    content: "Remise en état de vos meubles anciens avec des techniques traditionnelles, pour leur redonner toute leur noblesse.",
    image: "/images/service-restauration.jpg",
  },
  {
    step: "03",
    title: "Agencement intérieur personnalisé",
    content: "Conception d'espaces optimisés et esthétiques, adaptés à vos envies et à la configuration de votre habitat.",
    image: "/images/service-amenagement.jpg",
  },
  {
    step: "04",
    title: "Conseil en design & finitions",
    content: "Accompagnement sur le choix des essences, des lignes et des finitions pour un rendu à la fois harmonieux et fonctionnel.",
    image: "/images/service-conseil.jpg",
  },
];

export default function ServicesSectionExample() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <FeatureSteps features={services} title="Nos Services" />
    </div>
  );
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
}: FeatureStepsProps) {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Refs for GSAP animations
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionItemsRef = useRef<HTMLElement[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const mobileAccordionRef = useRef<HTMLDivElement>(null);
  
  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle responsive state with debounced resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    
    function handleResize() {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      
      setIsPortraitMobile((isMobile || isTablet) && isPortrait);
      setIsTabletPortrait(isTablet && isPortrait);
    }
    
    // Initial check
    handleResize();
    
    // Add debounced event listener
    function debouncedResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    }
    
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", debouncedResize);
    
    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", debouncedResize);
    };
  }, []);
  
  // GSAP animations with ScrollTrigger
  useLayoutEffect(() => {
    // Skip if not client-side
    if (!isClient) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial state to prevent flash
    gsap.set(titleRef.current, { autoAlpha: 0, y: 40 });
    
    if (accordionItemsRef.current && accordionItemsRef.current.length) {
      gsap.set(accordionItemsRef.current, { autoAlpha: 0, y: 20 });
    }
    
    gsap.set(formRef.current, { autoAlpha: 0, x: 40 });
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Animate the heading
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 60%",
          end: "center center",
          toggleActions: "play none none none",
        }
      });
      
      titleTl.to(titleRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Animate the accordion items with stagger
      if (accordionItemsRef.current && accordionItemsRef.current.length) {
        const accordionTl = gsap.timeline({
          scrollTrigger: {
            trigger: accordionRef.current,
            start: "top 65%",
            end: "bottom center",
            toggleActions: "play none none none",
          }
        });
        
        accordionTl.to(accordionItemsRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
      
      // Animate the form
      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          end: "bottom center",
          toggleActions: "play none none none",
        }
      });
      
      formTl.to(formRef.current, {
        x: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power2.out"
      });
      
      // Refresh ScrollTrigger to ensure proper initialization
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      
    }, servicesRef); // Scope to services section
    
    // Cleanup function
    return () => ctx.revert();
  }, [isClient, accordionItemsRef.current?.length]);
  
  // Add element to accordionItemsRef
  const addToAccordionRefs: RefCallback<HTMLElement> = (el) => {
    if (el && !accordionItemsRef.current.includes(el)) {
      accordionItemsRef.current.push(el);
    }
  };

  // Style pour tablette portrait
  const tabletPortraitStyle = {
    maxWidth: isTabletPortrait ? "calc(100% - 40px)" : "100%",
    margin: "0 auto",
    padding: isTabletPortrait ? "0 20px" : "0"
  };

  return (
    <div 
      ref={servicesRef}
      id="services"
      className={cn("p-8 py-8 md:p-12 md:py-16 lg:py-20 md:pb-16 lg:pb-20 bg-[#F9F6F1] text-[#3E2F1C] w-full", className)}
    >
      <div className="w-full max-w-6xl mx-auto" style={tabletPortraitStyle}>
        {/* Desktop-only title */}
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-10 text-center services-title hidden md:block"
        >
          {title}
        </h2>

        {/* Mobile-only accordion with nested services */}
        <div className="block md:hidden mb-4" ref={mobileAccordionRef}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="services-section">
              <AccordionTrigger className="text-3xl font-bold text-center w-full justify-center flex-col md:flex-row [&>span:last-child]:hidden">
                <div className="flex items-center justify-center">
                  {title}
                  <ChevronDown className="ml-2 h-6 w-6 text-[#3E2F1C] shrink-0 transition-transform duration-300 mobile-accordion-icon" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full mt-4">
                  {features.map((service, index) => (
                    <AccordionItem 
                      key={`mobile-service-${index}`}
                      value={`service-${index}`} 
                      className="border-b border-[#C17E6A]/30"
                    >
                      <AccordionTrigger className="text-[#3E2F1C] font-medium">
                        {service.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#3E2F1C]/80">
                        {service.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-0 md:mt-50 lg:mt-8 w-full rounded-xl p-6 md:p-8 bg-transparent">
          {/* Form component (both mobile and desktop) */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-start">
            {/* Form component */}
            <div ref={formRef} className="order-1 lg:order-2 w-full mx-auto md:max-w-lg contact-form text-center md:text-left">
              <LoginForm />
            </div>
            
            {/* Desktop-only accordion content */}
            <div ref={accordionRef} className="order-2 lg:order-1 w-full md:max-w-md lg:max-w-lg mx-auto lg:mx-0 px-4 hidden md:block">
              {/* Desktop/tablet title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#3E2F1C] text-center lg:text-left">
                Discutons de votre projet
              </h3>
              
              <Accordion type="single" collapsible className="w-full mb-8">
                <AccordionItem 
                  value="item-1" 
                  className="border-b border-[#C17E6A]/30"
                  ref={addToAccordionRefs}
                >
                  <AccordionTrigger className="text-[#3E2F1C] font-medium">
                    Mobilier personnalisé haut de gamme
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3E2F1C]/80">
                    Création de meubles uniques en bois noble, pensés pour s'adapter parfaitement à votre intérieur.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem 
                  value="item-2" 
                  className="border-b border-[#C17E6A]/30"
                  ref={addToAccordionRefs}
                >
                  <AccordionTrigger className="text-[#3E2F1C] font-medium">
                    Restauration & rénovation
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3E2F1C]/80">
                    Remise en état de vos meubles anciens avec des techniques traditionnelles, pour leur redonner toute leur noblesse.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem 
                  value="item-3" 
                  className="border-b border-[#C17E6A]/30"
                  ref={addToAccordionRefs}
                >
                  <AccordionTrigger className="text-[#3E2F1C] font-medium">
                    Agencement intérieur personnalisé
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3E2F1C]/80">
                    Conception d'espaces optimisés et esthétiques, adaptés à vos envies et à la configuration de votre habitat.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem 
                  value="item-4" 
                  className="border-b border-[#C17E6A]/30"
                  ref={addToAccordionRefs}
                >
                  <AccordionTrigger className="text-[#3E2F1C] font-medium">
                    Conseil en design & finitions
                  </AccordionTrigger>
                  <AccordionContent className="text-[#3E2F1C]/80">
                    Accompagnement sur le choix des essences, des lignes et des finitions pour un rendu à la fois harmonieux et fonctionnel.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 