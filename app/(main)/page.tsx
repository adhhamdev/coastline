import Hero from '@/components/pages/homepage/Hero';
import BusinessCategories from '@/components/pages/homepage/BusinessCategories';
import KeyFeatures from '@/components/pages/homepage/KeyFeatures';
import CTA from '@/components/pages/homepage/CTA';
import Footer from '@/components/common/Footer';

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      <BusinessCategories />
      <KeyFeatures />
      <CTA />
      <Footer />
    </div>
  );
}
