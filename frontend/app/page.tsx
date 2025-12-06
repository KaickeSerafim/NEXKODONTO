import { LandingConsultaHoje } from "./landing/components/consulta-hoje";
import { LandingFeatures } from "./landing/components/features";
import { LandingFooter } from "./landing/components/footer";
import { LandingHeader } from "./landing/components/header";
import { LandingHero } from "./landing/components/hero";


export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingConsultaHoje />
        <LandingFeatures />
      </main>
      <LandingFooter />
    </>
  )
}
