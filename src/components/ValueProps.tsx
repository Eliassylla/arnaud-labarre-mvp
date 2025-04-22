'use client'

import { Hammer, TreeDeciduous, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ValueProps() {
  return (
    <section className="bg-[#f8f5ef] border-t border-[#e0dcd5] py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8">
          Pourquoi choisir Arnaud Labarre ?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="flex flex-col items-center text-center bg-[#DEB887] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transform transition">
            <Hammer className="size-6 text-primary mb-2" />
            <h3 className="text-lg font-semibold mb-1">Savoir‑faire traditionnel</h3>
            <p className="text-sm text-[#3E2F1C]">
              Techniques artisanales transmises depuis des générations.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-[#DEB887] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transform transition">
            <TreeDeciduous className="size-6 text-primary mb-2" />
            <h3 className="text-lg font-semibold mb-1">Matériaux nobles</h3>
            <p className="text-sm text-[#3E2F1C]">
              Bois sélectionné pour sa durabilité et son esthétique.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-[#DEB887] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transform transition">
            <Edit3 className="size-6 text-primary mb-2" />
            <h3 className="text-lg font-semibold mb-1">Design personnalisé</h3>
            <p className="text-sm text-[#3E2F1C]">
              Créations sur mesure pour s'intégrer parfaitement à votre intérieur.
            </p>
          </div>
        </div>
        <div className="text-center">
          <Link href="#form">
            <Button
              size="lg"
              className="rounded-full bg-[#D2A060] text-white hover:bg-[#B8884C] cursor-pointer"
            >
              Demandez un devis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}