'use client'

import { useState, useEffect } from 'react';
import { Hammer, TreeDeciduous, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ScrollAnimation from '@/components/ui/scroll-animation'

export default function ValueProps() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);

  useEffect(() => {
    function updateSize() {
      setIsMobileOrTablet(window.innerWidth < 768 || (window.innerWidth < window.innerHeight));
      setIsPortraitMode(window.innerHeight > window.innerWidth);
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isMobilePortrait = isMobileOrTablet && isPortraitMode;

  const titleDuration = isMobilePortrait ? 0.6 : 0.8;
  const titleThreshold = isMobilePortrait ? 0.1 : 0.2;

  const gridDuration = isMobilePortrait ? 0.8 : 1;
  const gridThreshold = isMobilePortrait ? 0.1 : 0.2;

  const ctaDuration = isMobilePortrait ? 0.6 : 0.8;
  const ctaThreshold = isMobilePortrait ? 0.1 : 0.2;

  return (
    <section className="bg-[#f8f5ef] border-t border-[#e0dcd5] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-up" duration={titleDuration} threshold={titleThreshold}>
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8">
            Pourquoi choisir Arnaud Labarre ?
          </h2>
        </ScrollAnimation>
        
        <div className="mx-auto">
          <ScrollAnimation
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 justify-items-center"
            duration={gridDuration}
            threshold={gridThreshold}
            stagger={0.15}
          >
            <div className="w-full bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transform transition">
              <div className="flex flex-col items-center text-center">
                <Hammer className="size-6 text-[#A55B53] mb-2" />
                <h3 className="text-base font-semibold mb-1 text-[#3E2F1C]">Savoir‑faire traditionnel</h3>
                <p className="text-xs text-[#3E2F1C]">
                  Techniques artisanales transmises depuis des générations.
                </p>
              </div>
            </div>
            
            <div className="w-full bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transform transition">
              <div className="flex flex-col items-center text-center">
                <TreeDeciduous className="size-6 text-[#A55B53] mb-2" />
                <h3 className="text-base font-semibold mb-1 text-[#3E2F1C]">Matériaux nobles</h3>
                <p className="text-xs text-[#3E2F1C]">
                  Bois sélectionné pour sa durabilité et son esthétique.
                </p>
              </div>
            </div>
            
            <div className="w-full bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transform transition">
              <div className="flex flex-col items-center text-center">
                <Edit3 className="size-6 text-[#A55B53] mb-2" />
                <h3 className="text-base font-semibold mb-1 text-[#3E2F1C]">Design personnalisé</h3>
                <p className="text-xs text-[#3E2F1C]">
                  Créations sur mesure pour s&apos;intégrer parfaitement à votre intérieur.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
        
        <ScrollAnimation animation="fade-up" duration={ctaDuration} delay={0.3} threshold={ctaThreshold}>
          <div className="text-center">
            <Link href="#form">
              <Button
                size="lg"
                className="rounded-full bg-[#3E2F1C] text-white hover:bg-[#2d2316] cursor-pointer"
              >
                Demandez un devis
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}