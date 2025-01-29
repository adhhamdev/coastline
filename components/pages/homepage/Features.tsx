import { ShoppingBag, Users, Shield, Globe } from 'lucide-react';

const features = [
  {
    title: 'Marketplace',
    description: 'Buy and sell products directly with verified businesses across Sri Lanka',
    icon: ShoppingBag,
  },
  {
    title: 'Business Network',
    description: 'Connect with industry leaders and grow your professional network',
    icon: Users,
  },
  {
    title: 'Verified Partners',
    description: 'Trade with confidence through our verified business partner network',
    icon: Shield,
  },
  {
    title: 'Global Reach',
    description: 'Expand your business beyond borders with international trade opportunities',
    icon: Globe,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow your business
          </h2>
          <p className="text-lg text-gray-600">
            Coastline provides all the tools and connections you need to succeed in the Sri Lankan market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
