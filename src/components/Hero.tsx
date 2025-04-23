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
import { motion } from 'framer-motion'

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
        <motion.div 
          className="absolute inset-0 bg-black/60" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      {/* Filtre sombre pour la lisibilité */}
      
      {/* Contenu centré */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center xl:items-start justify-center h-full text-center xl:text-left text-white">
        <motion.h1 
          className={`text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-center xl:text-left ${charm.className}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Arnaud Labarre
        </motion.h1>
        <motion.p 
          className="max-w-2xl mb-6 md:mb-8 leading-relaxed italic text-base md:text-lg text-center xl:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mobilier d'exception en bois noble  façonné sur mesure pour sublimer votre intérieur.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="tel:0496892531">
            <Button size="lg" className="rounded-full bg-white text-black border border-white hover:bg-[#3E2F1C] hover:text-white hover:border-white cursor-pointer transition-colors duration-200">
              Appeler
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}