import Image from "next/image";

const testimonials = [
  {
    content:
      "Coastline has transformed how we connect with suppliers. The platform's verification system gives us confidence in every partnership.",
    author: "Samantha Perera",
    role: "CEO, Lanka Gems Ltd",
    image: "",
  },
  {
    content:
      "As a small business owner, Coastline helped me expand my network and find reliable trading partners across Sri Lanka.",
    author: "Rajiv Kumar",
    role: "Owner, Colombo Spice Traders",
    image: "",
  },
  {
    content:
      "The platform's ease of use and professional network has helped us establish valuable business connections we couldn't find elsewhere.",
    author: "Amara Silva",
    role: "Director, Blue Ocean Exports",
    image: "",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Businesses
          </h2>
          <p className="text-lg text-gray-600">
            See what our members say about their experience with Coastline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-600 italic">
                {testimonial.content}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
