'use client'

import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useScrollToSection } from '@/hooks/useScrollToSection';

export default function FeatureWithCarousel() {
  const slides = ['/images/real1.jpg', '/images/real2.jpg', '/images/real3.jpg']
  const containerRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | undefined>(undefined)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollToSection } = useScrollToSection();
  
  // Setup refs array for slides
  const setSwiperRef = (swiper: SwiperType) => {
    swiperRef.current = swiper
    
    // Add slide change listener for slide animations
    swiper.on('slideChangeTransitionStart', () => {
      setActiveIndex(swiper.activeIndex);
    })
  }

  // Update to use our scroll hook
  const handleScrollToForm = () => {
    scrollToSection('form');
  }

  return (
    <section ref={containerRef} className="py-20">
      <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2 items-center">
        {/* Texte */}
        <div className="text-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Une expertise qui parle d&apos;elle-même</h2>
          <p className="text-muted-foreground mb-6">
            Découvrez comment Arnaud Labarre sublime le bois noble à travers des créations sur mesure,
            alliant tradition et modernité.
          </p>
          <Button size="lg" onClick={handleScrollToForm}>Demandez un devis</Button>
        </div>
        
        {/* Carousel with simple transitions */}
        <div className="carousel-container overflow-hidden rounded-lg shadow-xl">
          <Swiper 
            spaceBetween={16} 
            slidesPerView={1} 
            loop
            onSwiper={setSwiperRef}
            className="h-full"
          >
            {slides.map((src, index) => (
              <SwiperSlide key={src}>
                <div className="relative h-[400px] w-full">
                  <Image
                    src={src}
                    alt={`Exemple réalisation ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                    style={{
                      transition: 'transform 0.8s ease-out',
                      transform: index === activeIndex ? 'scale(1)' : 'scale(1.05)'
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}