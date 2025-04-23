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
          <section id="accueil">
            <Hero />
          </section>
          <section id="a-propos">
            <ClientExperience />
          </section>
          <section id="services">
            <ServicesSectionExample />
          </section>
          <section id="atouts">
            <ValueProps />
          </section>
          <section id="realisations">
            <Feature />
          </section>
          <section id="faq">
            <FAQ />
          </section>
        </main>
        <section id="contact">
          <Footer />
        </section>
      </div>
    </>
  )
}
