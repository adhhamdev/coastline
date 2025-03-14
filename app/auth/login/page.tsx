import { MotionDiv } from "@/components/common/motion";
import LoginForm from "@/components/pages/auth/login/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryParams = await searchParams;

  return (
    <div className="relative min-h-screen flex">
      {/* Left Column - Greeting */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/homepage/sri-lanka-aerial.jpg"
            alt="Sri Lanka Aerial View"
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-xs" />
        </div>
        <div className="relative z-10 text-black p-8 space-y-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-32 h-32 mb-4 rounded-full border-2 border-primary/30 shadow-xl"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="currentColor"
              className="text-primary/70"
            />
          </svg>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-linear-to-r from-secondary to-slate-600 text-transparent bg-clip-text drop-shadow-xl">
              Welcome to Coastline
            </h1>
            <p className="text-xl">
              Discover the best of Sri Lankan businesses
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 bg-slate-200">
        <MotionDiv
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg">
            <MotionDiv variants={fadeInUp}>
              <CardHeader className="space-y-3">
                <CardTitle className="text-3xl font-bold text-center">
                  Sign In
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Choose your sign in method to continue exploring Sri Lankan
                  businesses.
                </CardDescription>
              </CardHeader>
            </MotionDiv>

            <CardContent className="space-y-6">
              <LoginForm />
              {queryParams.error && (
                <MotionDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 text-center bg-red-100/10 p-3 rounded-lg"
                >
                  {queryParams.error}
                </MotionDiv>
              )}
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </div>
  );
}
