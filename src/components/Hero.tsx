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
          src="/images/atelier-menuiserie-4.jpg"
          alt="Atelier de menuiserie d'Arnaud Labarre"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* Filtre sombre pour la lisibilité */}
      
      {/* Contenu centré */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-start justify-center h-full text-left text-white">
        <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${charm.className}`}>
          Arnaud Labarre
        </h1>
        <p className="max-w-2xl mb-8 leading-relaxed italic text-lg">
          Mobilier d’exception en bois noble  façonné sur mesure pour sublimer votre intérieur.
        </p>
        <Link href="tel:0474540672">
          <Button size="lg" className="rounded-full bg-white text-black">
            Appeler
          </Button>
        </Link>
      </div>
    </section>
  )
}