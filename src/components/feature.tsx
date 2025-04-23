'use client'

import Image from 'next/image';
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ScrollAnimation from "@/components/ui/scroll-animation";

function Feature() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  
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
  <div className="w-full pt-4 lg:pt-8 pb-8 lg:pb-16 bg-[#F8F5EF]">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Badge pour les petits écrans en mode paysage uniquement */}
        {isMobileOrTablet && !isPortraitMode && (
          <div className="flex justify-start mb-3">
            <Badge className="bg-[#DEB887] text-black dark:bg-[#5B270B] dark:text-white px-3 py-1 text-sm">
              Atelier
            </Badge>
          </div>
        )}
        
        {isDesktopLandscape ? (
          <ScrollAnimation animation="fade-up" duration={0.8} threshold={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8 text-center mx-auto">
              Nos réalisations
            </h2>
          </ScrollAnimation>
        ) : (
          <ScrollAnimation animation="fade-up" duration={0.6} threshold={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8 text-center mx-auto">
              Nos réalisations
            </h2>
          </ScrollAnimation>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="flex gap-4 flex-col items-center lg:items-start justify-center h-full">
            <div className="flex gap-2 flex-col w-full">
              {isMobileOrTablet ? (
                <ScrollAnimation animation="fade-up" duration={0.6} threshold={0.1}>
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
                </ScrollAnimation>
              ) : (
                <ScrollAnimation animation="fade-right" duration={1} threshold={0.2}>
                  <>
                    <h3 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-center lg:text-left">
                      Donnez vie à votre intérieur avec un mobilier sur mesure
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-left text-neutral-700 dark:text-neutral-300">
                      Depuis 20 ans, Arnaud Labarre conçoit des meubles d&apos;exception en bois noble, alliant savoir-faire traditionnel et design moderne pour sublimer votre espace.
                    </p>
                  </>
                </ScrollAnimation>
              )}
            </div>
          </div>
          {isDesktopLandscape ? (
            <ScrollAnimation animation="fade-left" duration={1} threshold={0.2}>
              <div className="w-full">
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
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation animation="fade-up" duration={0.6} threshold={0.1}>
              <div className="w-full">
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
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </div>
    </div>
  );
}

export { Feature };
