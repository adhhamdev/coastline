import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { Fish, Gem, MessageCircle, Store, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-32 w-full text-primary-foreground bg-gradient-to-r from-primary to-primary/70 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto space-y-8 max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Sri Lanka&apos;s Premier Business Network
          </h1>
          <p className="mt-3 text-xl sm:mt-5 sm:text-2xl">
            Connect with gem traders, fishermen, and local businesses.
            Buy, sell, and grow your business in one place.
          </p>
          <div className="flex flex-col justify-center mt-5 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="w-full bg-card text-primary hover:bg-secondary sm:w-auto rounded-full">
              <Link href="/auth/login">{user ? "Continue" : "Get Started"}</Link>
            </Button>
            <Button variant="ghost" asChild size="lg" className="w-full border-card hover:bg-white/10 sm:w-auto rounded-full">
              <Link href="#discover">Discover More</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606739324571-7f4c46f084b8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      </section>

      {/* Business Categories */}
      <section id="discover" className="px-4 py-16 w-full bg-card text-card-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-center">Featured Categories</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Gem,
                title: "Gem Trading",
                description: "Connect with verified gem merchants and explore precious stones from Sri Lanka."
              },
              {
                icon: Fish,
                title: "Fishing Industry",
                description: "Fresh catches, wholesale opportunities, and direct connections with fishing communities."
              },
              {
                icon: Store,
                title: "Local Businesses",
                description: "Discover and connect with various local businesses across Sri Lanka."
              }
            ].map((category, index) => (
              <div key={index} className="p-6 bg-secondary rounded-lg border border-border">
                <category.icon className="mb-4 w-12 h-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-4 py-16 w-full bg-muted sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-center">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Verified Community",
                description: "Connect with verified businesses and traders across Sri Lanka."
              },
              {
                icon: MessageCircle,
                title: "Direct Communication",
                description: "Chat directly with sellers and buyers in real-time."
              },
              {
                icon: TrendingUp,
                title: "Business Growth",
                description: "Expand your reach and grow your business with our platform."
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-6 text-center">
                <feature.icon className="mb-4 w-12 h-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 w-full text-primary-foreground bg-gradient-to-r from-primary to-primary/80 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to grow your business?</h2>
          <p className="mb-8 text-xl">Join thousands of Sri Lankan businesses already on our platform.</p>
          <Button asChild size="lg" className="bg-card text-primary hover:bg-secondary">
            <Link href="/auth/login">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 w-full bg-card text-card-foreground sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 mx-auto max-w-6xl md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-lg font-semibold">Marketplace</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/gems">Gems & Jewelry</Link></li>
              <li><Link href="/fishing">Fishing</Link></li>
              <li><Link href="/local">Local Products</Link></li>
            </ul>
          </div>
          {/* ... rest of the footer sections ... */}
        </div>
        <div className="mt-8 text-sm text-center text-muted-foreground">
          {`© ${new Date().getFullYear()} Coastline. All rights reserved.`}
        </div>
      </footer>
    </div>
  );
}
