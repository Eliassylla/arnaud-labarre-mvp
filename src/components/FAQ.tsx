'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import ScrollAnimation from '@/components/ui/scroll-animation'

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

  return (
    <div className="w-full bg-[#F8F5EF]">
      <div className="container mx-auto py-20 px-4 text-[#3E2F1C]">
        <ScrollAnimation animation="fade-up" duration={0.7}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            FAQ
          </h2>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-up" delay={0.2} stagger={0.1}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>
      </div>
    </div>
  )
}