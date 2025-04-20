import Image from 'next/image';
import { Check } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

export default function ClientExperience() {
  return (
<section className="w-full py-16 bg-[#F9F6F1] overflow-visible">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 items-start gap-8">
        {/* Left: Circular image layout */}
        <div className="relative flex justify-center overflow-visible">
          <Avatar className="w-80 h-80 relative overflow-hidden">
            <Image
              src="/images/atelier-menuiserie-3.jpg"
              alt="Experience client"
              fill
              className="object-cover"
            />
          </Avatar>
          <Avatar className="absolute top-0 right-0 w-32 h-32 relative overflow-hidden border-4 border-white">
            <Image
              src="/images/atelier-menuiserie-2.jpg"
              alt="Client portrait"
              fill
              className="object-cover"
            />
          </Avatar>
          
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3E2F1C]">
            Mobilier sur mesure en bois noble depuis 20 ans
          </h2>
          <p className="text-[#3E2F1C] mb-6">
            Alliant savoir‑faire traditionnel et design contemporain, Arnaud crée des pièces uniques qui subliment chaque intérieur.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Mobilier sur mesure haut de gamme en bois noble',
              'Restauration et rénovation de meubles anciens',
              'Aménagement d’intérieur et agencement sur mesure',
              'Conseil en design et finitions personnalisées',
            ].map((item) => (
              <li key={item} className="flex items-start">
                <Check className="mt-1 size-5 text-[#A55B53]" />
                <span className="ml-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
