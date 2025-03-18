"use client";
import { MotionDiv } from "@/components/common/motion";
import { Button } from "@/components/ui/button";
import FacebookButton from "../../login/facebook-button";
import GoogleButton from "../../login/google-button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <MotionDiv variants={fadeInUp} className="space-y-4">
        <GoogleButton />
        <FacebookButton />

        <Button
          className="w-full bg-black hover:bg-zinc-800 hover:scale-105 text-white rounded-full transition-all duration-300"
          size="lg"
          type="submit"
        >
          Continue with Apple
        </Button>
      </MotionDiv>
    </form>
  );
}
