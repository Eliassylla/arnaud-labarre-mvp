"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/login-form"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}
export default function ServicesSectionExample() {
  const features = [
    {
      step: "01",
      title: "Mobilier personnalisé haut de gamme",
      content: "Création de meubles uniques en bois noble, pensés pour s'adapter parfaitement à votre intérieur.",
      image: "/images/service-mobilier.jpg",
    },
    {
      step: "02",
      title: "Restauration & rénovation",
      content: "Remise en état de vos meubles anciens avec des techniques traditionnelles, pour leur redonner toute leur noblesse.",
      image: "/images/service-restauration.jpg",
    },
    {
      step: "03",
      title: "Agencement intérieur personnalisé",
      content: "Conception d'espaces optimisés et esthétiques, adaptés à vos envies et à la configuration de votre habitat.",
      image: "/images/service-amenagement.jpg",
    },
    {
      step: "04",
      title: "Conseil en design & finitions",
      content: "Accompagnement sur le choix des essences, des lignes et des finitions pour un rendu à la fois harmonieux et fonctionnel.",
      image: "/images/service-conseil.jpg",
    },
  ];
 
  return (
    <div className="w-full">
      <FeatureSteps features={features} title="Nos Services" autoPlayInterval={1000} />
    </div>
  );
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 6000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPortraitMobile, setIsPortraitMobile] = useState(false)
  
  useEffect(() => {
    const handleResize = () => {
      setIsPortraitMobile(window.innerWidth < 768 && window.matchMedia("(orientation: portrait)").matches)
    }
  
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12 bg-[#F9F6F1] text-[#3E2F1C] w-full", className)}>
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center">{title}</h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          {isPortraitMobile ? (
            <div className="w-full">
              {/* Accordéon principal "Nos Services" */}
              <Accordion type="single" collapsible className="w-full" defaultValue="services">
                <AccordionItem value="services">
                  <AccordionTrigger>
                    <h3 className="text-xl font-semibold mb-2 w-full text-center">{title}</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Sous-accordéon pour chaque service */}
                    <Accordion type="multiple" className="w-full">
                      {features.map((feature, idx) => (
                        <AccordionItem value={String(idx)} key={idx}>
                          <AccordionTrigger>
                            <span className="text-base font-medium">{feature.title}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-[#3E2F1C]">{feature.content}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ) : (
            <div className="order-2 md:order-1 space-y-8 w-full">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-6 md:gap-8"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className={cn(
                      "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                      index === currentFeature
                        ? "bg-primary border-primary text-primary-foreground scale-110"
                        : "bg-muted border-muted-foreground",
                    )}
                  >
                    {index <= currentFeature ? (
                      <span className="text-lg font-bold">✓</span>
                    ) : (
                      <span className="text-lg font-semibold">{index + 1}</span>
                    )}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold">{feature.title || feature.step}</h3>
                    <p className="text-sm md:text-lg text-[#3E2F1C]">{feature.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="order-1 md:order-2 w-full">
            <div className="w-full flex justify-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
