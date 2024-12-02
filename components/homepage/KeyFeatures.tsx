import { Users } from "lucide-react";
import { MessageCircle, TrendingUp } from "lucide-react";
import { MotionDiv } from "../common/motion";

export default function KeyFeatures() {
    return (
        <section className="relative px-4 py-24 w-full bg-muted/50 sm:px-6 lg:px-8">
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mx-auto max-w-6xl"
            >
                <h2 className="mb-16 text-4xl font-bold text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Why Choose Our Platform
                    </span>
                </h2>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
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
                        <MotionDiv
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center p-8 text-center rounded-3xl bg-background/50 backdrop-blur-sm hover:bg-background transition-colors duration-300"
                        >
                            <div className="mb-6 p-4 rounded-full bg-primary/10">
                                <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </MotionDiv>
                    ))}
                </div>
            </MotionDiv>
        </section>
    )
}