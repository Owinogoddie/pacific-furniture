import Brand from "@/components/Brand";
import Esignup from "@/components/Esignup";
import { Hero } from "@/components/Hero";
import OurProducts from "@/components/OurProducts";


export default function Home() {
  return (
    <main>
      <div>
        <Hero />
        <Brand />
        <OurProducts />
        <Esignup />
      </div>
    </main>
  )
}