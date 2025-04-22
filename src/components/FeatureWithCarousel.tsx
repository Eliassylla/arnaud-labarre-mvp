'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function FeatureWithCarousel() {
  const slides = ['/images/real1.jpg', '/images/real2.jpg', '/images/real3.jpg']

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2 items-center">
        {/* Texte */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Une expertise qui parle d'elle-même</h2>
          <p className="text-muted-foreground mb-6">
            Découvrez comment Arnaud Labarre sublime le bois noble à travers des créations sur mesure,
            alliant tradition et modernité.
          </p>
          <Button size="lg">Demandez un devis</Button>
        </div>
        {/* Carousel */}
        <div>
          <Swiper spaceBetween={16} slidesPerView={1} loop>
            {slides.map((src) => (
              <SwiperSlide key={src}>
                <Image
                  src={src}
                  alt="Exemple réalisation"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}