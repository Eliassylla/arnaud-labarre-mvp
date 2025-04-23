'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// S'assurer que GSAP peut utiliser ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  duration?: number;
  delay?: number;
  threshold?: number; // 0-1, le pourcentage de l'élément qui doit être visible pour déclencher l'animation
  className?: string;
  stagger?: number; // Délai entre les animations des enfants
  once?: boolean; // Si l'animation ne doit se jouer qu'une seule fois
}

export default function ScrollAnimation({
  children,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  threshold = 0.2,
  className = '',
  stagger = 0,
  once = true,
}: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ne rien faire côté serveur
    if (typeof window === 'undefined') return;

    // Configuration de l'animation basée sur le type choisi
    let animationConfig: gsap.TweenVars = { 
      opacity: 0,
      autoAlpha: 0,
      duration,
      ease: 'power2.out',
    };

    switch (animation) {
      case 'fade-up':
        animationConfig = { ...animationConfig, y: 40 };
        break;
      case 'fade-down':
        animationConfig = { ...animationConfig, y: -40 };
        break;
      case 'fade-left':
        animationConfig = { ...animationConfig, x: -40 };
        break;
      case 'fade-right':
        animationConfig = { ...animationConfig, x: 40 };
        break;
      case 'zoom-in':
        animationConfig = { ...animationConfig, scale: 0.9 };
        break;
      case 'zoom-out':
        animationConfig = { ...animationConfig, scale: 1.1 };
        break;
    }

    // Si stagger > 0, animer les enfants individuellement
    const target = stagger > 0 && childrenRef.current ? 
      childrenRef.current.children : 
      containerRef.current;
    
    if (!target) return;

    // Préparer l'animation
    gsap.set(target, animationConfig);

    // Créer l'animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top ${100 - threshold * 100}%`,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        // markers: true, // Décommenter pour déboguer
      },
    });

    // Animer vers les valeurs par défaut
    const resetValues: gsap.TweenVars = {
      opacity: 1,
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power2.out',
    };

    // Ajouter l'animation au timeline
    if (stagger > 0 && childrenRef.current) {
      tl.to(childrenRef.current.children, {
        ...resetValues,
        stagger,
      });
    } else {
      tl.to(target, resetValues);
    }

    // Nettoyer
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, duration, delay, threshold, stagger, once]);

  return (
    <div ref={containerRef} className={className}>
      {stagger > 0 ? (
        <div ref={childrenRef} className="w-full">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
} 