'use client'

import { Charm } from "next/font/google";
const charm = Charm({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PhoneMenu } from "@/components/ui/phone-menu";

export default function Hero() {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    function update() {
      const isSmall = window.innerWidth < 768;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsMobilePortrait(isSmall && isPortrait);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const overlayDur = isMobilePortrait ? 0.6 : 1.2;
  const titleDur   = isMobilePortrait ? 0.8 : 1;
  const textDur    = isMobilePortrait ? 0.8 : 1;
  const buttonDur  = isMobilePortrait ? 0.6 : 1;
  const yShift     = isMobilePortrait ? 10 : 20;

  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Ne rien faire côté serveur
    if (typeof window === 'undefined') return;
    
    // Configuration initiale
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: -30 });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(buttonRef.current, { opacity: 0, y: 20 });
    
    // Animation séquentielle avec durées dynamiques
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(overlayRef.current, { opacity: 1, duration: overlayDur })
      .to(titleRef.current,   { opacity: 1, y: 0, duration: titleDur },   `-=${titleDur * 0.6}`)
      .to(textRef.current,    { opacity: 1, y: yShift, duration: textDur }, `-=${textDur * 0.6}`)
      .to(buttonRef.current,  { opacity: 1, y: 0, duration: buttonDur },  `-=${buttonDur * 0.6}`);
    
    return () => {
      tl.kill();
    };
  }, [overlayDur, titleDur, textDur, buttonDur, yShift]);
  
  return (
    <section className="relative w-full h-screen">
      {/* Arrière-plan plein écran */}
      <div className="absolute inset-0">
        <Image
          src="/images/atelier-menuiserie-4.webp"
          alt="Atelier de menuiserie d'Arnaud Labarre"
          fill
          className="object-cover"
          priority
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black/60" />
      </div>
      {/* Filtre sombre pour la lisibilité */}
      
      {/* Contenu centré */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center xl:items-start justify-center h-full text-center xl:text-left text-white">
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-center xl:text-left ${charm.className}`}
        >
          Arnaud Labarre
        </h1>
        <p 
          ref={textRef}
          className="max-w-2xl mb-6 md:mb-8 leading-relaxed italic text-base md:text-lg text-center xl:text-left"
        >
          Mobilier d&apos;exception en bois noble façonné sur mesure pour sublimer votre intérieur.
        </p>
        <div ref={buttonRef} className="mt-4 bg-black/30 backdrop-blur-sm rounded-lg px-5 py-3">
          <PhoneMenu />
        </div>
      </div>
    </section>
  )
}