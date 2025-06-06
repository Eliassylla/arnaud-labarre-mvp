'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useState, useEffect } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Quels types de meubles proposez-vous ?",
      answer: "Nous créons des meubles sur mesure en bois noble, adaptés à vos besoins et à votre intérieur."
    },
    {
      question: "Comment passer commande ?",
      answer: "Vous pouvez nous contacter via le formulaire de demande de projet ou par téléphone pour obtenir un devis personnalisé."
    },
    {
      question: "Quels sont les délais de réalisation ?",
      answer: "Les délais varient selon la complexité du projet, généralement entre 4 et 8 semaines après validation du devis."
    },
    {
      question: "Proposez-vous un service de rénovation ?",
      answer: "Oui, nous restaurons et rénovons vos meubles anciens en respectant les techniques traditionnelles."
    },
    {
      question: "Comment obtenir un devis ?",
      answer: "Remplissez le formulaire de demande de projet avec le plus de détails possible, et nous vous répondrons sous 48 h."
    }
  ]

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobileOrTablet(isSmallScreen);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full bg-[#F8F5EF]">
        <div className="container mx-auto py-12 px-4 text-[#3E2F1C]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-md p-4">
                <h3 className="font-medium">{faq.question}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8F5EF]">
      <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4 text-[#3E2F1C]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 lg:mb-14 text-center">
          FAQ
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`faq-${idx}`}
                className="border border-[#d9cfc0] rounded-lg shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="hover:bg-[#f1ede5] px-4 py-3 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3">
                  <div className="accordion-content">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}