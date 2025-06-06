'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap/gsap-config';
import { SmoothScrollWrapper } from '@/components/layout/SmoothScrollWrapper';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { TextReveal } from '@/components/animation/TextReveal';
import { useSmoothScroll } from '@/lib/gsap/useSmoothScroll';

export default function GsapTestPage() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { smoothScrollTo } = useSmoothScroll();
  
  useEffect(() => {
    // Simple animation on page load
    if (boxRef.current) {
      gsap.from(boxRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, []);
  
  const handleScrollToSection = (id: string) => {
    smoothScrollTo({ targetId: id, offset: -50 });
  };
  
  return (
    <SmoothScrollWrapper smoothness={0.8} speed={1}>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <TextReveal 
              text="GSAP Animation Test" 
              as="h1"
              className="text-4xl md:text-6xl font-bold mb-6"
              stagger={0.03}
              duration={0.05}
            />
            
            <div ref={boxRef} className="mt-8">
              <p className="text-lg text-gray-600 mb-8">
                This page demonstrates the GSAP animation capabilities that have been set up.
              </p>
              
              <button 
                onClick={() => handleScrollToSection('scroll-section')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Scroll Down
              </button>
            </div>
          </div>
        </section>
        
        {/* Scroll Reveal Section */}
        <section id="scroll-section" className="min-h-screen p-6 py-24 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Scroll Reveal Examples</h2>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ScrollReveal 
                  key={index}
                  direction={['up', 'down', 'left', 'right', 'fade', 'scale'][index % 6] as 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'}
                  className="h-full"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">
                      {['Fade Up', 'Fade Down', 'Fade Left', 'Fade Right', 'Fade In', 'Scale'][index % 6]}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      This card animates with a {['upward', 'downward', 'leftward', 'rightward', 'fade', 'scale'][index % 6]} animation when it enters the viewport.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-blue-600">Learn more →</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        
        {/* Text Animation Section */}
        <section className="min-h-screen p-6 py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Text Animation Examples</h2>
            
            <div className="space-y-12">
              <ScrollReveal>
                <div className="bg-gray-50 p-8 rounded-lg">
                  <TextReveal 
                    text="Character by character animation" 
                    as="h3"
                    className="text-2xl font-semibold mb-4"
                  />
                  <p className="text-gray-600">
                    This text reveals character by character as you scroll down the page.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <TextReveal 
                    text="Smooth scroll navigation" 
                    as="h3"
                    className="text-2xl font-semibold mb-4"
                  />
                  <p className="text-gray-600">
                    Try the smooth scrolling navigation with the button at the top.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <TextReveal 
                    text="GSAP ScrollTrigger integration" 
                    as="h3"
                    className="text-2xl font-semibold mb-4"
                  />
                  <p className="text-gray-600">
                    ScrollTrigger makes it easy to create scroll-based animations.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => handleScrollToSection('top')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </section>
      </main>
    </SmoothScrollWrapper>
  );
}