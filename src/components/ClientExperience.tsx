'use client'
import Image from 'next/image';
// import { Check } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function ClientExperience() {
  return (
<section className="w-full py-16 bg-[#F9F6F1] overflow-visible">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 items-start gap-8">
        {/* Left: Circular image layout */}
        <div className="relative w-full pt-4">
          <Avatar className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000 }}
              className="rounded-full overflow-hidden w-full h-full"
            >
              {[
                '/images/atelier-menuiserie-1.webp',
                '/images/atelier-menuiserie-2.webp',
                '/images/atelier-menuiserie-3.webp',
              ].map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={src}
                    alt={`Photo atelier ${index + 1}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Avatar>
        </div>

        {/* Right: Content */}
        <div className="text-center lg:text-left lg:mx-0 max-w-md px-6 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#3E2F1C] text-center lg:text-left pt-8">
            Arnaud Labarre crée du mobilier sur mesure en bois noble depuis plus de 20 ans
          </h2>
          <p className="text-sm sm:text-base leading-relaxed lg:pl-0 lg:pr-10 sm:px-4 px-6 mb-8 text-[#3E2F1C]">
            Arnaud Labarre conçoit, restaure et aménage du mobilier en bois noble sur mesure. Chaque pièce allie savoir-faire artisanal et design contemporain pour sublimer votre intérieur.
          </p>
        </div>
      </div>
    </section>
  );
}
