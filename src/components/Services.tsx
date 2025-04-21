"use client"
import React, { useState, useEffect } from "react"

function useWindowSize() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPortraitMobile(
        window.innerWidth < 768 &&
          window.matchMedia("(orientation: portrait)").matches
      );
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPortraitMobile;
}

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/login-form"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const phrases = [
  "Création de meubles uniques en bois noble, pensés pour s’adapter parfaitement à votre intérieur.",
  "Remise à neuf de pièces anciennes avec des techniques traditionnelles pour leur redonner éclat et durabilité.",
  "Conception de solutions fonctionnelles et esthétiques pour transformer vos pièces avec élégance.",
  "Chaque projet bénéficie d’un accompagnement expert pour harmoniser matériaux, style et usage au quotidien.",
]

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

export default function ServicesSectionExample() {
  const features: Feature[] = [
    {
      step: "01",
      title: "Mobilier personnalisé haut de gamme",
      content: "Création de meubles uniques en bois noble, pensés pour s’adapter parfaitement à votre intérieur.",
      image: "/images/service-mobilier.jpg",
    },
    {
      step: "02",
      title: "Restauration & rénovation",
      content: "Remise à neuf de pièces anciennes avec des techniques traditionnelles pour leur redonner éclat et durabilité.",
      image: "/images/service-restauration.jpg",
    },
    {
      step: "03",
      title: "Agencement d’espaces optimisé",
      content: "Conception de solutions fonctionnelles et esthétiques pour transformer vos pièces avec élégance.",
      image: "/images/service-amenagement.jpg",
    },
    {
      step: "04",
      title: "Conseil en design & finitions",
      content: "Chaque projet bénéficie d’un accompagnement expert pour harmoniser matériaux, style et usage au quotidien.",
      image: "/images/service-conseil.jpg",
    },
  ]

  return (
    <div className="w-full">
      <FeatureSteps features={features} title="Nos Services" autoPlayInterval={1000} />
    </div>
  )
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
}

export const FeatureSteps = React.memo(function FeatureSteps({
  features,
  className,
  title = "Nos Services",
  autoPlayInterval = 6000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const isPortraitMobile = useWindowSize();

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [features.length, autoPlayInterval])

  return (
    <div className={cn("p-4 md:p-6 bg-[#F9F6F1] text-[#3E2F1C] w-full", className)}>
      <div className="w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-3xl font-bold mb-2">{title}</AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex flex-col gap-4 mt-4 mb-4">
                <h3 className="text-xl md:text-3xl font-bold mb-2 text-center">{features[currentFeature].title}</h3>
                <AnimatePresence mode="wait">
                  {isPortraitMobile ? (
                    <motion.div
                      key={currentFeature}
                      className="text-center h-[120px] flex flex-col justify-center items-center overflow-hidden gap-1"
                      initial={{ opacity: 0, x: 100 }}  // Départ du texte à droite
                      animate={{ opacity: 1, x: 0 }}   // Position finale au centre
                      exit={{ opacity: 0, x: -100 }}   // Sortie vers la gauche
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => {
                            const newFeature = currentFeature === 0 ? features.length - 1 : currentFeature - 1
                            setCurrentFeature(newFeature)
                            setCurrentPhrase(0)
                          }}
                          className="text-xl text-[#3E2F1C] hover:text-primary"
                        >
                          ←
                        </button>
                        <p className="text-sm text-[#3E2F1C] text-center px-2">{phrases[currentPhrase]}</p>
                        <button
                          onClick={() => {
                            const newFeature = currentFeature === features.length - 1 ? 0 : currentFeature + 1
                            setCurrentFeature(newFeature)
                            setCurrentPhrase(0)
                          }}
                          className="text-xl text-[#3E2F1C] hover:text-primary"
                        >
                          →
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="relative h-[120px] w-full">
                      <motion.div
                        key={currentFeature}
                        className="text-center h-[120px] flex flex-col justify-center items-center overflow-hidden gap-1"
                        initial={{ opacity: 0, x: 100 }}  // Départ du texte à droite
                        animate={{ opacity: 1, x: 0 }}   // Position finale au centre
                        exit={{ opacity: 0, x: -100 }}   // Sortie vers la gauche
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <h3 className="text-xl font-semibold mb-2">{features[currentFeature].title}</h3>
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="text-sm text-[#3E2F1C] mt-2 mb-4"
                        >
                          {isOpen ? "Masquer les détails" : "Afficher les détails"}
                        </button>
                        {isOpen && (
                          <motion.div
                            className="text-sm text-[#3E2F1C] text-center px-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {features[currentFeature].content}
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="order-1 md:order-2">
          <div className="w-full max-w-lg mx-auto flex flex-col items-start gap-1 p-4 px-2 md:px-4">
            <div className="w-full flex flex-col gap-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
