import { UserPlus, Search, HandshakeIcon, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up and complete your business profile with relevant details',
    icon: UserPlus,
    color: 'blue',
  },
  {
    title: 'Discover Partners',
    description: 'Search and connect with verified businesses in your industry',
    icon: Search,
    color: 'green',
  },
  {
    title: 'Make Connections',
    description: 'Establish partnerships and start trading with trusted businesses',
    icon: HandshakeIcon,
    color: 'purple',
  },
  {
    title: 'Grow Together',
    description: 'Scale your business through successful partnerships',
    icon: TrendingUp,
    color: 'orange',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Coastline Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started with Coastline in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-xl p-8 text-center relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${step.color}-100 text-${step.color}-600 mb-6 mx-auto`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
