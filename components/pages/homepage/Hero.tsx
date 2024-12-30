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
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default async function Hero() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <section className="relative min-h-[100dvh] w-full bg-gradient-to-br from-cyan-50 via-blue-100/50 to-white overflow-hidden pt-20 lg:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="relative z-10 space-y-6 sm:space-y-8 text-center lg:text-left">
            <MotionDiv
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-4 sm:space-y-6"
            >
              <MotionDiv
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 max-w-xl mx-auto lg:mx-0"
              >
                Sri Lanka&apos;s Premier Business Network
              </MotionDiv>

              <MotionDiv
                variants={fadeInUp}
                className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0"
              >
                Connect with gem traders, fishermen, and local businesses. Buy,
                sell, and grow your business in one place.
              </MotionDiv>

              <MotionDiv variants={fadeInUp} className="pt-2 sm:pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/auth/login">
                    {user ? "Dashboard" : "Get Started"}
                  </Link>
                </Button>
              </MotionDiv>
            </MotionDiv>
          </div>

          {/* Right content - Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-blue-200/40 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-12 sm:translate-x-12 blur-xl" />
            <div className="relative z-10 mx-auto lg:mx-0 max-w-lg">
              <Image
                src="/images/homepage/hero.webp"
                alt="Professional using laptop"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-300/30 rounded-xl translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12 blur-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
