import { Waves } from "lucide-react";

import { ArrowRight } from "lucide-react";
import { MotionDiv } from "../common/motion";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative px-4 py-24 w-full text-primary-foreground overflow-hidden bg-gradient-to-br from-primary via-primary/50 to-primary/70 sm:px-6 lg:px-8">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 mx-auto max-w-4xl text-center"
            >
                <h2 className="mb-6 text-4xl font-bold">Ready to grow your business?</h2>
                <p className="mb-10 text-xl text-blue-50/90">Join thousands of Sri Lankan businesses already on our platform.</p>
                <Button
                    asChild
                    size="lg"
                    className="group bg-card text-primary hover:bg-white hover:scale-105 transition-all duration-300 rounded-full"
                >
                    <Link href="/auth/login" className="flex items-center gap-2">
                        Get Started Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </MotionDiv>
            <Waves className="absolute bottom-0 left-0 w-full h-24 text-background/10 transform rotate-180" />
        </section>
    )
}