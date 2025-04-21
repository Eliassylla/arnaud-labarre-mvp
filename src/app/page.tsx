import { Header1 } from '@/components/header'
import Hero from '@/components/Hero'
import ClientExperience from '@/components/ClientExperience'
import ServicesSectionExample from '@/components/Services'
import ValueProps from '@/components/ValueProps'
import { Feature } from '@/components/feature'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'


export default function Page() {
  return (
    <>
      <Header1 />
      <div className="bg-[#F8F5EF]">
        <main>
          <section id="accueil" className="scroll-mt-20">
            <Hero />
          </section>
          <section id="a-propos" className="scroll-mt-20">
            <ClientExperience />
          </section>
          <section id="services" className="scroll-mt-10">
            <ServicesSectionExample />
          </section>
          <section id="atouts" className="scroll-mt-10">
            <ValueProps />
          </section>
          <section id="realisations" className="scroll-mt-20">
            <Feature />
          </section>
          <section id="faq" className="scroll-mt-20">
            <FAQ />
          </section>
        </main>
        <section id="contact" className="scroll-mt-0">
          <Footer />
        </section>
      </div>
    </>
  )
}
