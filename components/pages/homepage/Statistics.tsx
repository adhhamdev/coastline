const stats = [
  {
    value: '10K+',
    label: 'Active Users',
    description: 'Professionals using our platform',
  },
  {
    value: '₨5M+',
    label: 'Monthly Trade Volume',
    description: 'Value of transactions per month',
  },
  {
    value: '1000+',
    label: 'Verified Businesses',
    description: 'Trusted partners in our network',
  },
  {
    value: '25+',
    label: 'Industries',
    description: 'Diverse business categories',
  },
];

export default function Statistics() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sri Lanka&apos;s Fastest Growing Business Network
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of businesses already growing with Coastline
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-xl p-8 text-center hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
