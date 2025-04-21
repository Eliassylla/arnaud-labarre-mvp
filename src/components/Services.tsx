"use client"
import React, { useState, useEffect } from "react"

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isPortraitMobile: false,
    isDesktop: false,
    isLandscape: false,
    isTabletPortrait: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortraitMobile = width < 768 && window.matchMedia("(orientation: portrait)").matches;
      const isTabletPortrait = width >= 768 && width < 1024 && window.matchMedia("(orientation: portrait)").matches;
      const isDesktop = width >= 1024;
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;

      setWindowSize({
        width,
        height,
        isPortraitMobile,
        isDesktop,
        isLandscape,
        isTabletPortrait,
      });
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/login-form"
import { ChevronDown } from "lucide-react"

const phrases = [
  "Création de meubles uniques en bois noble, pensés pour s'adapter parfaitement à votre intérieur.",
  "Remise à neuf de pièces anciennes avec des techniques traditionnelles pour leur redonner éclat et durabilité.",
  "Conception de solutions fonctionnelles et esthétiques pour transformer vos pièces avec élégance.",
  "Chaque projet bénéficie d'un accompagnement expert pour harmoniser matériaux, style et usage au quotidien.",
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
      title: "Mobilier sur mesure",
      content: "Création de meubles uniques en bois noble, pensés pour s'adapter parfaitement à votre intérieur.",
      image: "/images/real1.webp",
    },
    {
      step: "02",
      title: "Restauration & rénovation",
      content: "Remise à neuf de pièces anciennes avec des techniques traditionnelles pour leur redonner éclat et durabilité.",
      image: "/images/real2.webp",
    },
    {
      step: "03",
      title: "Agencement d'espaces optimisé",
      content: "Conception de solutions fonctionnelles et esthétiques pour transformer vos pièces avec élégance.",
      image: "/images/real3.webp",
    },
    {
      step: "04",
      title: "Conseil en design & finitions",
      content: "Chaque projet bénéficie d'un accompagnement expert pour harmoniser matériaux, style et usage au quotidien.",
      image: "/images/real4.webp",
    },
  ]

  return (
    <div className="w-full">
      <FeatureSteps features={features} title="Nos Services" autoPlayInterval={4000} />
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
  autoPlayInterval = 4000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMainAccordionOpen, setIsMainAccordionOpen] = useState(false)
  const { isPortraitMobile, isTabletPortrait } = useWindowSize();

  // Animation pour changer les caractéristiques avec délai supplémentaire
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, autoPlayInterval);
    
    return () => clearInterval(timer);
  }, [features.length, autoPlayInterval]);

  // Animation pour changer les phrases avec délai supplémentaire et avec 0,2 seconde de décalage
  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000 + 200); // 4 secondes + 0,2 seconde de décalage
    
    return () => clearInterval(phraseTimer);
  }, []);

  // Animation de transition fluide avec délai
  const fadeAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  // Animation pour le titre avec délai
  const titleAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  // Animation pour le paragraphe avec délai supplémentaire
  const paragraphAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 } // Délai de 0,2 seconde
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const toggleAccordion = (value: string) => {
    setExpandedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  // Déterminer si nous sommes en mode mobile ou tablette portrait où nous voulons l'accordion principal
  const needsMainAccordion = isPortraitMobile || isTabletPortrait;

  // Animation de rotation pour l'icône de l'accordéon
  const iconAnimation = {
    initial: { rotate: 0 },
    open: { 
      rotate: 180, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
  };

  // Gestionnaire pour l'accordéon principal
  const handleMainAccordionClick = () => {
    setIsMainAccordionOpen(!isMainAccordionOpen);
  };

  return (
    <div className={cn("p-4 md:p-6 bg-[#F9F6F1] text-[#3E2F1C] w-full", className)}>
      {needsMainAccordion ? (
        <div className="flex flex-col space-y-2">
          {/* Version mobile/tablette portrait avec accordion principal */}
          <div className="border-b border-[#E5DFD3]">
            <div className="flex justify-center">
              <button 
                onClick={handleMainAccordionClick}
                className="text-3xl font-bold py-3 flex items-center gap-2 text-center"
              >
                {title}
                <motion.div
                  initial="initial"
                  animate={isMainAccordionOpen ? "open" : "initial"}
                  variants={iconAnimation}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </button>
            </div>

            {isMainAccordionOpen && (
              <div className="pt-2 w-full pb-4">
                <div className="text-center relative min-h-[130px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`feature-${currentFeature}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeAnimation}
                      className="flex flex-col items-center"
                    >
                      <motion.h3 
                        key={`title-${currentFeature}`}
                        variants={titleAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-xl md:text-2xl font-bold mb-2"
                      >
                        {features[currentFeature].title}
                      </motion.h3>

                      <motion.p 
                        key={`phrase-${currentPhraseIndex}`}
                        variants={paragraphAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-sm text-[#3E2F1C] text-center px-2 max-w-md"
                      >
                        {phrases[currentPhraseIndex]}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Formulaire pour mobile/tablette portrait */}
          <div className="w-full mt-2">
            <div className="w-full max-w-lg mx-auto bg-[#F7F2E8] rounded-lg p-4">
              <LoginForm />
            </div>
          </div>
        </div>
      ) : (
        // Version desktop/tablette paysage
        <>
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-3xl font-bold text-center flex items-center gap-2">
              {title}
            </h2>
          </div>
          
          <div className="w-full flex flex-row items-start gap-8">
            {/* Section gauche pour desktop (textes accordéons) */}
            <div className="w-1/2 flex flex-col justify-center">
              <div className="w-full">
                {features.map((feature, index) => (
                  <div 
                    key={`accordion-${index}`}
                    className="mb-3 border border-[#E5DFD3] rounded-lg overflow-hidden"
                  >
                    <button 
                      onClick={() => toggleAccordion(`item-${index}`)}
                      className="w-full text-left px-4 py-3 text-lg font-medium hover:bg-[#EBE6DD] flex justify-between items-center"
                    >
                      <span>{feature.title}</span>
                      <motion.div
                        initial="initial"
                        animate={expandedItems.includes(`item-${index}`) ? "open" : "initial"}
                        variants={iconAnimation}
                        className="ml-2"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </button>
                    
                    {expandedItems.includes(`item-${index}`) && (
                      <div className="px-4 py-2">
                        <motion.p
                          key={`content-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } // Ajout du délai de 0,2 seconde
                          }}
                          className="text-sm text-[#3E2F1C]"
                        >
                          {feature.content}
                        </motion.p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section droite (formulaire) */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full max-w-lg mx-auto bg-[#F7F2E8] rounded-lg p-4">
                <LoginForm />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
})
