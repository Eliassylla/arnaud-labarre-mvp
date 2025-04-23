'use client'
import Image from 'next/image';
import { useState, useEffect } from "react";
// import { Check } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function ClientExperience() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  
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
  
  return (
    <section className="w-full py-8 bg-[#F9F6F1] overflow-visible">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Titre "À propos" centré pour toutes les versions */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-12 text-center text-[#3E2F1C]">
          À propos
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-8 w-full max-w-6xl mx-auto">
          {/* Mobile/tablet portrait order - text first, then avatar */}
          <div className="order-1 lg:order-2 text-center lg:text-left w-full max-w-md mx-auto px-4 md:px-6 lg:px-10 lg:max-w-xl">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#3E2F1C] text-center lg:text-left pt-2 lg:leading-tight">
              Arnaud Labarre crée du mobilier sur mesure en bois noble depuis plus de 20 ans
            </h3>
            {/* N'afficher le paragraphe que sur desktop OU en mode paysage */}
            {(!isMobileOrTablet || !isPortraitMode) && (
              <p className="text-sm sm:text-base leading-relaxed mb-8 text-[#3E2F1C] text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                Arnaud Labarre conçoit, restaure et aménage du mobilier en bois noble sur mesure. Chaque pièce allie savoir-faire artisanal et design contemporain pour sublimer votre intérieur.
              </p>
            )}
          </div>

          {/* Avatar section - centered in all viewports */}
          <div className="order-2 lg:order-1 flex justify-center w-full mt-4 lg:mt-0">
            <Avatar className="relative w-80 h-80 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] overflow-hidden">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                className="rounded-full overflow-hidden w-full h-full"
              >
                {[
                  '/images/atelier-menuiserie-2.webp',
                  '/images/atelier-menuiserie-3.webp',
                  '/images/atelier-menuiserie-4.webp',
                ].map((src, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={src}
                      alt={`Photo atelier ${index + 1}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
}

