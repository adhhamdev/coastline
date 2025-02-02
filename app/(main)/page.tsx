import Footer from "@/components/common/Footer";
import CTA from "@/components/pages/homepage/CTA";
import Features from "@/components/pages/homepage/Features";
import Hero from "@/components/pages/homepage/Hero";
import HowItWorks from "@/components/pages/homepage/how-It-works";
import Partners from "@/components/pages/homepage/Partners";
import Statistics from "@/components/pages/homepage/Statistics";
import Testimonials from "@/components/pages/homepage/Testimonials";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <Partners />
      <CTA />
      <Footer />
    </main>
  );
}
