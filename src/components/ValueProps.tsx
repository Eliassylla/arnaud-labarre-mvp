'use client'

import { Hammer, TreeDeciduous, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function ValueProps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={ref} className="bg-[#f8f5ef] border-t border-[#e0dcd5] py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Pourquoi choisir Arnaud Labarre ?
        </motion.h2>
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="flex flex-col items-center text-center bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transform transition"
            variants={itemVariants}
          >
            <Hammer className="size-8 text-[#A55B53] mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-[#3E2F1C]">Savoir‑faire traditionnel</h3>
            <p className="text-sm text-[#3E2F1C]">
              Techniques artisanales transmises depuis des générations.
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center text-center bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transform transition"
            variants={itemVariants}
          >
            <TreeDeciduous className="size-8 text-[#A55B53] mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-[#3E2F1C]">Matériaux nobles</h3>
            <p className="text-sm text-[#3E2F1C]">
              Bois sélectionné pour sa durabilité et son esthétique.
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center text-center bg-[#f3e5d0] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transform transition"
            variants={itemVariants}
          >
            <Edit3 className="size-8 text-[#A55B53] mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-[#3E2F1C]">Design personnalisé</h3>
            <p className="text-sm text-[#3E2F1C]">
              Créations sur mesure pour s&apos;intégrer parfaitement à votre intérieur.
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="#form">
            <Button
              size="lg"
              className="rounded-full bg-[#3E2F1C] text-white hover:bg-[#2d2316] cursor-pointer"
            >
              Demandez un devis
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}