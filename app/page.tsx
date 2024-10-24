import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-gray-900">
      {/* Hero Section */}
      <section className="px-4 py-12 w-full text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 sm:px-6 lg:px-8">
        <div className="mx-auto space-y-8 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to Coastline
          </h1>
          <p className="mt-3 text-xl sm:mt-5 sm:text-2xl">
            A full-featured web application built with Next.js and Supabase.
            Experience modern web development at its finest.
          </p>
          <div className="flex flex-col justify-center mt-5 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="w-full text-blue-600 bg-white sm:w-auto hover:bg-gray-100">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="w-full text-white border-white sm:w-auto hover:bg-white hover:text-blue-600">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 w-full bg-gray-50 dark:bg-gray-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "Modern Stack", description: "Built with Next.js 13 and Supabase for a blazing-fast, scalable application." },
              { title: "User Authentication", description: "Secure and easy-to-use authentication system powered by Supabase Auth." },
              { title: "Responsive Design", description: "Fully responsive layout that looks great on desktop, tablet, and mobile devices." },
              { title: "Real-time Data", description: "Leverage Supabase's real-time capabilities for live updates and collaboration." },
              { title: "API Integration", description: "Easily connect with third-party services and APIs to extend functionality." },
              { title: "Analytics Dashboard", description: "Gain insights into your application's usage with built-in analytics tools." },
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <h3 className="mb-2 text-xl font-semibold dark:text-white">{feature.title}</h3>
                <p className="dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 w-full dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold dark:text-white">How Coastline Works</h2>
          <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            {[
              { step: 1, title: "Sign Up", description: "Create your account in seconds" },
              { step: 2, title: "Customize", description: "Set up your project and preferences" },
              { step: 3, title: "Launch", description: "Go live with your application" },
            ].map((step, index) => (
              <div key={index} className="flex-1">
                <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 text-xl font-bold text-white bg-blue-500 rounded-full">
                  {step.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold dark:text-white">{step.title}</h3>
                <p className="dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 w-full bg-gray-50 dark:bg-gray-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "John Doe", role: "Frontend Developer", quote: "Coastline has revolutionized our development process. It's incredibly fast and easy to use." },
              { name: "Jane Smith", role: "Product Manager", quote: "The real-time features have greatly improved our team's collaboration. Highly recommended!" },
              { name: "Mike Johnson", role: "Startup Founder", quote: "Coastline allowed us to launch our MVP in record time. It's a game-changer for startups." },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <p className="mb-4 italic dark:text-gray-300">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <div className="mr-4 w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-500"></div>
                  <div>
                    <p className="font-semibold dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 w-full dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: "Starter", price: "$9", features: ["Up to 5 projects", "Basic analytics", "24/7 support"] },
              { name: "Pro", price: "$29", features: ["Unlimited projects", "Advanced analytics", "Priority support", "API access"] },
              { name: "Enterprise", price: "Custom", features: ["Custom solutions", "Dedicated account manager", "On-premise deployment option"] },
            ].map((plan, index) => (
              <div key={index} className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <h3 className="mb-2 text-2xl font-semibold dark:text-white">{plan.name}</h3>
                <p className="mb-4 text-4xl font-bold dark:text-white">{plan.price}<span className="text-sm font-normal dark:text-gray-300">/month</span></p>
                <ul className="mb-6 space-y-2 dark:text-gray-300">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-full" variant={index === 1 ? "default" : "outline"}>
                  <Link href="/signup">Choose Plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 w-full text-white bg-blue-600 dark:bg-blue-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-xl">Join Coastline today and experience the future of web applications.</p>
          <Button asChild size="lg" className="text-blue-600 bg-white hover:bg-gray-100">
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 w-full text-white bg-gray-800 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 mx-auto max-w-6xl md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-lg font-semibold">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="/docs">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/status">Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-sm text-center">
          © 2023 Coastline. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
