"use client"
import React, { useState, useEffect } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { LoginForm } from "@/components/login-form"

// Hook pour détecter la taille de l'écran
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isPortraitMobile: false,
    isTabletPortrait: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortraitMobile = width < 768 && window.matchMedia("(orientation: portrait)").matches;
      const isTabletPortrait = width >= 768 && width < 1024 && window.matchMedia("(orientation: portrait)").matches;
      const isDesktop = width >= 1024 || window.matchMedia("(orientation: landscape)").matches;

      setWindowSize({
        width,
        height,
        isPortraitMobile,
        isTabletPortrait,
        isDesktop,
      });
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function Services() {
  const { isPortraitMobile, isTabletPortrait, isDesktop } = useWindowSize();
  const needsMainAccordion = isPortraitMobile || isTabletPortrait;
  
  const services = [
    {
      title: "Création de meubles",
      description: "Création de meubles uniques en bois noble pour votre intérieur."
    },
    {
      title: "Restauration",
      description: "Restauration de pièces anciennes avec des techniques traditionnelles."
    },
    {
      title: "Aménagement",
      description: "Solutions fonctionnelles et esthétiques pour transformer vos espaces."
    },
    {
      title: "Conseils personnalisés",
      description: "Accompagnement expert pour harmoniser matériaux et style."
    }
  ]

  return (
    <div className="w-full px-4 py-8 bg-[#F9F6F1] text-[#3E2F1C]">
      {needsMainAccordion ? (
        // Version mobile/tablette portrait - avec accordéon principal
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="services">
              <AccordionTrigger className="text-xl font-semibold">
                Nos services
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 mt-4">
                  {services.map((service, index) => (
                    <Accordion key={index} type="single" collapsible className="w-full border-b border-gray-200 pb-2">
                      <AccordionItem value={`service-${index}`}>
                        <AccordionTrigger>
                          <h3 className="text-lg font-medium">{service.title}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="mt-2 text-gray-600">{service.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Formulaire version mobile - placé en dehors de l'accordéon */}
          <div id="form" className="mt-8">
            <LoginForm />
          </div>
        </div>
      ) : (
        // Version desktop/tablette paysage - sans accordéon principal
        <div className="container mx-auto max-w-6xl">
          {/* Titre principal sans accordéon */}
          <h2 className="text-3xl font-bold mb-8 text-center">Nos services</h2>
          
          <div className="flex flex-row gap-8">
            {/* Colonne gauche - Accordéons des services */}
            <div className="w-1/2 space-y-4">
              {services.map((service, index) => (
                <Accordion key={index} type="single" collapsible className="w-full">
                  <AccordionItem value={`service-${index}`}>
                    <AccordionTrigger>
                      <h3 className="text-lg font-medium">{service.title}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mt-2 text-gray-600">{service.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
            
            {/* Colonne droite - Formulaire sans cadran */}
            <div id="form" className="w-1/2 pt-2">
              <LoginForm />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
