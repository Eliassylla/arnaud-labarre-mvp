'use client'

import { Charm } from "next/font/google";
const charm = Charm({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
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
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* Filtre sombre pour la lisibilité */}
      
      {/* Contenu centré */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center xl:items-start justify-center h-full text-center xl:text-left text-white">
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-center xl:text-left ${charm.className}`}>
          Arnaud Labarre
        </h1>
        <p className="max-w-2xl mb-6 md:mb-8 leading-relaxed italic text-base md:text-lg text-center xl:text-left">
          Mobilier d’exception en bois noble  façonné sur mesure pour sublimer votre intérieur.
        </p>
        <Link href="tel:0496892531">
          <Button size="lg" className="rounded-full bg-white text-black border border-white hover:bg-[#3E2F1C] hover:text-white hover:border-white cursor-pointer transition-colors duration-200">
            Appeler
          </Button>
        </Link>
      </div>
    </section>
  )
}