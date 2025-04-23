'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { motion } from 'framer-motion'

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full bg-[#F8F5EF]">
      <div className="container mx-auto py-20 px-4 text-[#3E2F1C]">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          FAQ
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={item} transition={{ duration: 0.5 }}>
                <AccordionItem value={`faq-${idx}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}