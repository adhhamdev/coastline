import Hero from '@/components/pages/homepage/Hero';
import Features from '@/components/pages/homepage/Features';
import HowItWorks from '@/components/pages/homepage/HowItWorks';
import Testimonials from '@/components/pages/homepage/Testimonials';
import Statistics from '@/components/pages/homepage/Statistics';
import Partners from '@/components/pages/homepage/Partners';
import CTA from '@/components/pages/homepage/CTA';
import Footer from '@/components/common/Footer';

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
