import Image from "next/image";

const partners = [
  {
    name: "Ceylon Chamber of Commerce",
    logo: "",
  },
  {
    name: "Export Development Board",
    logo: "",
  },
  {
    name: "Sri Lanka Gem & Jewelry Authority",
    logo: "",
  },
  {
    name: "National Chamber of Commerce",
    logo: "",
  },
  {
    name: "Ministry of Industry and Commerce",
    logo: "",
  },
  {
    name: "Sri Lanka Tourism Board",
    logo: "",
  },
];

export default function Partners() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Trusted by Leading Organizations
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="relative w-32 h-16">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
