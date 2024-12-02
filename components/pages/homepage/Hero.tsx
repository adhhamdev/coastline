import { ArrowRight } from "lucide-react";

import { Waves } from "lucide-react";
import { MotionDiv } from "../../common/motion";
import { Button } from "../../ui/button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const heroImage = "/images/homepage/sri-lanka-aerial.jpg";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default async function Hero() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    return (
        <section className="relative min-h-[90vh] flex items-center px-4 w-full text-secondary-foreground bg-gradient-to-br from-primary via-primary/10 to-primary/30 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={heroImage}
                    alt="Sri Lanka Aerial View"
                    fill
                    priority
                    className="object-cover object-center opacity-10"
                    sizes="100vw"
                />
            </div>
            <Waves className="absolute bottom-0 left-0 w-full h-24 text-background/10" />

            <div className="relative z-10 mx-auto space-y-8 max-w-5xl text-center">
                <MotionDiv
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="space-y-6"
                >
                    <MotionDiv
                        variants={fadeInUp}
                        className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
                    >
                        Sri Lanka&apos;s Premier
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                            Business Network
                        </span>
                    </MotionDiv>

                    <MotionDiv
                        variants={fadeInUp}
                        className="mt-3 text-xl sm:mt-5 sm:text-2xl max-w-3xl mx-auto text-blue-600/70"
                    >
                        Connect with gem traders, fishermen, and local businesses.
                        Buy, sell, and grow your business in one place.
                    </MotionDiv>

                    <MotionDiv
                        variants={fadeInUp}
                        className="flex flex-col justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="group w-full bg-card text-primary hover:scale-105 hover:bg-primary/10 transition-all duration-300 sm:w-auto rounded-full"
                        >
                            <Link href="/auth/login" className="flex items-center justify-center gap-2">
                                {user ? "Continue" : "Get Started"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            asChild
                            size="lg"
                            className="w-full border-2 border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 sm:w-auto rounded-full"
                        >
                            <Link href="#discover">Discover More</Link>
                        </Button>
                    </MotionDiv>
                </MotionDiv>
            </div>
        </section>
    )
}