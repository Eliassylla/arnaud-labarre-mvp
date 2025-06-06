'use client';

import { useState, useEffect, useRef } from 'react';
import { Header1 } from '@/components/header'
import Hero from '@/components/Hero'
import ClientExperience from '@/components/ClientExperience'
import ServicesSectionExample from '@/components/Services'
import ValueProps from '@/components/ValueProps'
import { Feature } from '@/components/feature'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal';
import { SmoothScrollWrapper } from '@/components/layout/SmoothScrollWrapper';
import { useBasicAnimations, useSmoothScroll } from '@/hooks/useBasicAnimations';

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Add a class to the document body to indicate JS is loaded
    document.body.classList.add('js-loaded');
  }, []);
  
  // Regular content
  const pageContent = (
    <SmoothScrollWrapper enabled={true} smoothness={1} speed={1}>
      <div className="bg-[#F8F5EF]">
        <main>
          {/* Hero section doesn't need an additional ScrollReveal wrapper */}
          <section id="accueil" className="mb-12 md:mb-16 lg:mb-20">
            <Hero />
          </section>
          
          <ScrollReveal direction="up" distance={40} duration={0.8} delay={0.1} once={true} start="top 50%">
            <section id="a-propos" className="mb-12 md:mb-16 lg:mb-20">
              <ClientExperience />
            </section>
          </ScrollReveal>
          
          <ScrollReveal direction="up" distance={30} duration={0.8} stagger={0.2} start="top 55%">
            <section id="services" className="mb-12 md:mb-16 lg:mb-20">
              <ServicesSectionExample />
            </section>
          </ScrollReveal>
          
          <ScrollReveal direction="left" distance={40} duration={0.9} stagger={0.15} start="top 60%">
            <section id="atouts" className="mb-12 md:mb-16 lg:mb-20">
              <ValueProps />
            </section>
          </ScrollReveal>
          
          <ScrollReveal direction="fade" duration={1} stagger={0.2} start="top 65%">
            <section id="realisations" className="mb-12 md:mb-16 lg:mb-20">
              <Feature />
            </section>
          </ScrollReveal>
          
          <ScrollReveal direction="up" distance={30} duration={0.8} stagger={0.1} start="top 70%">
            <section id="faq" className="mb-12 md:mb-16 lg:mb-20">
              <FAQ />
            </section>
          </ScrollReveal>
        </main>
        
        <ScrollReveal direction="up" distance={30} duration={0.8} delay={0.1} start="top 75%">
          <section id="contact">
            <Footer />
          </section>
        </ScrollReveal>
      </div>
    </SmoothScrollWrapper>
  );
  
  return (
    <>
      <Header1 />
      {isClient ? (
        pageContent
      ) : (
        // Fallback for SSR - without animations
        <div className="bg-[#F8F5EF]">
          <main>
            <section id="accueil" className="mb-12 md:mb-16 lg:mb-20"><Hero /></section>
            <section id="a-propos" className="mb-12 md:mb-16 lg:mb-20"><ClientExperience /></section>
            <section id="services" className="mb-12 md:mb-16 lg:mb-20"><ServicesSectionExample /></section>
            <section id="atouts" className="mb-12 md:mb-16 lg:mb-20"><ValueProps /></section>
            <section id="realisations" className="mb-12 md:mb-16 lg:mb-20"><Feature /></section>
            <section id="faq" className="mb-12 md:mb-16 lg:mb-20"><FAQ /></section>
          </main>
          <section id="contact"><Footer /></section>
        </div>
      )}
    </>
  )
}
