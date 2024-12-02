import { createClient } from '@/utils/supabase/server';

import Hero from '@/components/homepage/Hero';
import BusinessCategories from '@/components/homepage/BusinessCategories';
import KeyFeatures from '@/components/homepage/KeyFeatures';
import CTA from '@/components/homepage/CTA';
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
