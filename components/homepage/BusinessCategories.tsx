import { Gem, Store } from "lucide-react";
import { Fish } from "lucide-react";
import { MotionDiv } from "../common/motion";
import Image from "next/image";

const categoryImages = {
    gems: "/images/homepage/gems-bg.jpg",
    fishing: "/images/homepage/fishing-bg.jpg",
    local: "/images/homepage/local-business-bg.jpg"
};

export default function BusinessCategories() {
    return (
        <section id="discover" className="px-4 py-24 w-full bg-background text-foreground sm:px-6 lg:px-8">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-6xl"
            >
                <h2 className="mb-16 text-4xl font-bold text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Featured Categories
                    </span>
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        {
                            icon: Gem,
                            title: "Gem Trading",
                            description: "Connect with verified gem merchants and explore precious stones from Sri Lanka.",
                            bgImage: categoryImages.gems
                        },
                        {
                            icon: Fish,
                            title: "Fishing Industry",
                            description: "Fresh catches, wholesale opportunities, and direct connections with fishing communities.",
                            bgImage: categoryImages.fishing
                        },
                        {
                            icon: Store,
                            title: "Local Businesses",
                            description: "Discover and connect with various local businesses across Sri Lanka.",
                            bgImage: categoryImages.local
                        }
                    ].map((category, index) => (
                        <MotionDiv
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="group relative overflow-hidden p-6 rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={category.bgImage}
                                    alt={category.title}
                                    fill
                                    className="object-cover object-center opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <category.icon className="mb-4 w-12 h-12 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
                                <p className="text-muted-foreground">{category.description}</p>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </MotionDiv>
        </section>
    )
}