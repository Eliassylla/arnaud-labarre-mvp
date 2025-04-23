"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/login-form"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react"
import ScrollAnimation from '@/components/ui/scroll-animation'

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

const services: Feature[] = [
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

export default function ServicesSectionExample() {
  return (
    <div className="w-full">
      <FeatureSteps features={services} title="Nos Services" autoPlayInterval={1000} />
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
  const [isTabletPortrait, setIsTabletPortrait] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  
  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      
      setIsPortraitMobile((isMobile || isTablet) && isPortrait);
      setIsTabletPortrait(isTablet && isPortrait);
    }
  
    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
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

  const titleDuration = isPortraitMobile ? 0.6 : 0.8;
  const titleThreshold = isPortraitMobile ? 0.1 : 0.2;

  const formDuration = isPortraitMobile ? 0.6 : 0.8;
  const formThreshold = isPortraitMobile ? 0.1 : 0.2;
  const formDelay = isPortraitMobile ? 0 : 0.2;

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Style pour tablette portrait
  const tabletPortraitStyle = {
    maxWidth: isTabletPortrait ? "calc(100% - 40px)" : "100%",
    margin: "0 auto",
    padding: isTabletPortrait ? "0 20px" : "0"
  };

  return (
    <div className={cn("p-8 md:p-12 md:pb-20 lg:pb-28 bg-[#F9F6F1] text-[#3E2F1C] w-full", className)}>
      <div className="w-full max-w-5xl mx-auto" style={tabletPortraitStyle}>
        <ScrollAnimation animation="fade-up" duration={titleDuration} threshold={titleThreshold}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-auto ${isPortraitMobile ? 'mb-6' : 'mb-10'}`}>
            {title}
          </h2>
        </ScrollAnimation>

        {/* Vue pour mobile et tablette portrait */}
        {isPortraitMobile ? (
          <div className="flex flex-col items-center w-full">
            {/* Accordéon de services */}
            <ScrollAnimation animation="fade-up" duration={0.6} threshold={0.1} className="w-full mb-8">
              <div className="w-full max-w-md mx-auto">
                <div className="w-full border border-[#e0d7c8] rounded-md overflow-hidden">
                  <button 
                    className="w-full flex items-center justify-center gap-2 py-2 text-base font-medium hover:bg-[#f1ede5] transition-colors"
                    onClick={toggleServices}
                  >
                    <span className="inline-flex items-center justify-center text-center w-full">
                      Voir tous les services
                      <ChevronDown 
                        className={`h-4 w-4 ml-2 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>
                
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 py-2">
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
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Formulaire pour mobile et tablette portrait */}
            <ScrollAnimation animation="fade-up" duration={0.6} threshold={0.1} className="w-full">
              <div 
                id="form"
                className="w-full flex justify-center items-center"
                style={{ scrollMarginTop: "120px" }}
              >
                <div className="w-full max-w-md mx-auto">
                  <LoginForm className="w-full" />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        ) : (
          // Vue pour desktop
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            <ScrollAnimation animation="fade-left" className="order-2 lg:order-1">
              <div className="space-y-8 w-full">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 md:gap-8"
                    style={{ opacity: index === currentFeature ? 1 : 0.3 }}
                  >
                    <div
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
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-semibold">{feature.title || feature.step}</h3>
                      <p className="text-sm md:text-lg text-[#3E2F1C]">{feature.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-right" duration={formDuration} delay={formDelay} threshold={formThreshold} className="order-1 lg:order-2 w-full">
              <div
                id="form"
                className="w-full flex flex-col items-center justify-center"
                style={{ scrollMarginTop: "120px" }}
              >
                <LoginForm className="w-full max-w-md" />
              </div>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </div>
  )
} 