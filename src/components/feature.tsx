import Image from 'next/image';
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Feature() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };
  
  const images = [
    '/images/real1.webp',
    '/images/real2.webp',
    '/images/real3.webp',
    '/images/real4.webp',
  ];

  return (
  <div className="w-full pt-4 lg:pt-8 pb-8 lg:pb-16 bg-[#F8F5EF]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex justify-center lg:hidden mb-3">
          <Badge className="bg-[#DEB887] text-black dark:bg-[#5B270B] dark:text-white px-3 py-1 text-sm">
            Atelier
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E2F1C] dark:text-[#F8F5EF] mb-8 text-center mx-auto">
          Nos réalisations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="flex gap-4 flex-col items-center lg:items-start justify-center h-full">
            <div className="hidden lg:block">
              <Badge className="bg-[#DEB887] text-black dark:bg-[#5B270B] dark:text-white px-3 py-1 text-sm">
                Atelier
              </Badge>
            </div>
            <div className="flex gap-2 flex-col w-full">
              <h3 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-center lg:text-left">
                Donnez vie à votre intérieur avec un mobilier sur mesure
              </h3>
              
              {isMobileOrTablet ? (
                <div className="w-full mt-2">
                  <button 
                    onClick={toggleDescription} 
                    className="flex items-center justify-center gap-2 w-full py-2 bg-[#DEB887] text-[#3E2F1C] rounded-md font-medium"
                  >
                    <span>En savoir plus</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${isDescriptionOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isDescriptionOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed tracking-tight text-center text-neutral-700 dark:text-neutral-300 px-2 py-3 bg-[#f3e5d0] rounded-md">
                      Depuis 20 ans, Arnaud Labarre conçoit des meubles d&apos;exception en bois noble, alliant savoir-faire traditionnel et design moderne pour sublimer votre espace.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm md:text-base lg:text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-left text-neutral-700 dark:text-neutral-300">
                  Depuis 20 ans, Arnaud Labarre conçoit des meubles d&apos;exception en bois noble, alliant savoir-faire traditionnel et design moderne pour sublimer votre espace.
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-md aspect-video">
                      <Image
                        src={src}
                        alt={`Réalisation ${index + 1}`}
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
