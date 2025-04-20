"use client"

import { FeatureSteps } from "./Services"

export default function FeatureSectionExample() {
  const features = [
    {
      step: "01",
      title: "Mobilier sur mesure haut de gamme",
      content: "Création de meubles personnalisés en bois noble, adaptés à vos espaces et envies.",
      image: "/images/service-mobilier.jpg",
    },
    {
      step: "02",
      title: "Restauration & rénovation",
      content: "Remise à neuf et restauration de vos pièces anciennes selon les techniques traditionnelles.",
      image: "/images/service-restauration.jpg",
    },
    {
      step: "03",
      title: "Aménagement d’intérieur sur mesure",
      content: "Conception d’agencements personnalisés pour optimiser et sublimer vos pièces.",
      image: "/images/service-amenagement.jpg",
    },
    {
      step: "04",
      title: "Conseil en design & finitions",
      content: "Accompagnement dans le choix des essences et finitions pour un rendu esthétique durable.",
      image: "/images/service-conseil.jpg",
    },
  ]

  return (
    <div className="w-full">
      <FeatureSteps features={features} title="Nos Services" autoPlayInterval={5000} />
    </div>
  )
}
