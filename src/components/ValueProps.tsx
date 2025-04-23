'use client'

import { Hammer, TreeDeciduous, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ScrollAnimation from '@/components/ui/scroll-animation'

export default function ValueProps() {
  return (
    <section className="bg-[#f8f5ef] border-t border-[#e0dcd5] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-up" duration={0.7}>
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8">
            Pourquoi choisir Arnaud Labarre ?
          </h2>
        </ScrollAnimation>
        
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation className="flex flex-col md:flex-row gap-6 mb-10" stagger={0.15}>
            <div className="flex-1 bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transform transition">
              <div className="flex flex-col items-center text-center h-full">
                <Hammer className="size-7 text-[#A55B53] mb-2" />
                <h3 className="text-base font-semibold mb-2 text-[#3E2F1C]">Savoir‑faire traditionnel</h3>
                <p className="text-xs text-[#3E2F1C]">
                  Techniques artisanales transmises depuis des générations.
                </p>
              </div>
            </div>
            
            <div className="flex-1 bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transform transition">
              <div className="flex flex-col items-center text-center h-full">
                <TreeDeciduous className="size-7 text-[#A55B53] mb-2" />
                <h3 className="text-base font-semibold mb-2 text-[#3E2F1C]">Matériaux nobles</h3>
                <p className="text-xs text-[#3E2F1C]">
                  Bois sélectionné pour sa durabilité et son esthétique.
                </p>
              </div>
            </div>
            
            <div className="flex-1 bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transform transition">
              <div className="flex flex-col items-center text-center h-full">
                <Edit3 className="size-7 text-[#A55B53] mb-2" />
                <h3 className="text-base font-semibold mb-2 text-[#3E2F1C]">Design personnalisé</h3>
                <p className="text-xs text-[#3E2F1C]">
                  Créations sur mesure pour s&apos;intégrer parfaitement à votre intérieur.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
        
        <ScrollAnimation animation="fade-up" delay={0.3}>
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