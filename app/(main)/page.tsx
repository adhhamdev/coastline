import Footer from "@/components/common/Footer";
import CTA from "@/components/pages/homepage/cta";
import Features from "@/components/pages/homepage/features";
import Hero from "@/components/pages/homepage/hero";
import HowItWorks from "@/components/pages/homepage/how-It-works";
import Partners from "@/components/pages/homepage/partners";
import Statistics from "@/components/pages/homepage/statistics";
import Testimonials from "@/components/pages/homepage/testimonials";

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
