import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import About from "@/components/about/About";
import PurchaseCTA from "@/components/purchaseCTA/purchase";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="banner cover -z-6"></div>
      <Features />
      <About />
      <PurchaseCTA/>
    </>
  );  
}
