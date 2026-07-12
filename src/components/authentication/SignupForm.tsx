"use client";

import { authClient } from "@/lib/auth-client";
import { manropeFont } from "@/lib/fonts";
import { errorToast, successToast } from "@/lib/toasts";
import { ArrowUpRight } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const inputStyles =
  "w-full px-4 py-2.5 rounded-xl bg-white border border-[#778DA9]/25 text-[#0D1B2A] placeholder:text-[#1B263B]/40 text-sm outline-none focus:ring-[#415A77] transition-colors duration-200";

const labelStyles = "text-sm font-semibold text-[#0D1B2A] mb-1.5 block";

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const photoUrl = (formData.get("photoUrl") as string) || undefined;

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl,
      });

      if (data) {
        successToast("Registration Successfull");
        redirect("/");
      } else if (error) {
        errorToast(error.message ?? "Something went wrong during signup");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-b from-[#778DA9]/15 via-[#E0E1DD]/30 to-white px-4 md:px-6 pt-30 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-[#778DA9]/20 rounded-3xl shadow-[0_20px_60px_rgba(13,27,42,0.12)] px-7 py-8 md:px-9 md:py-9">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 justify-center mb-6"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0D1B2A] flex items-center justify-center">
              <span className="text-[#E0E1DD] font-bold text-sm">Q</span>
            </div>
            <span
              className={`${manropeFont.className} text-lg font-bold text-[#0D1B2A]`}
            >
              Quillo
            </span>
          </Link>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1
              className={`${manropeFont.className} text-xl md:text-[1.75rem] font-bold text-[#0D1B2A] tracking-tight`}
            >
              Start your writing journey
            </h1>
            <p className="mt-1.5 text-sm text-[#1B263B]/70">
              Create an account to publish your first story.
            </p>
          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2.5 h-11 rounded-full border border-[#778DA9]/25 bg-white hover:bg-[#E0E1DD]/40 text-[#0D1B2A] text-sm font-semibold transition-colors duration-200 mb-5"
          >
            <FcGoogle className="w-4.5 h-4.5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#778DA9]/20" />
            <span className="text-xs text-[#1B263B]/40 font-medium">OR</span>
            <div className="flex-1 h-px bg-[#778DA9]/20" />
          </div>

          {/* Form */}
          <Form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <TextField isRequired name="name" type="text">
              <Label className={labelStyles}>Full Name</Label>
              <Input placeholder="Your name" className={inputStyles} />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className={labelStyles}>Email</Label>
              <Input placeholder="you@example.com" className={inputStyles} />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) return "Must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Add 1 uppercase letter";
                if (!/[0-9]/.test(value)) return "Add 1 number";
                return null;
              }}
            >
              <Label className={labelStyles}>
                Password{" "}
                <span className="text-[#1B263B]/40 font-normal text-xs">
                  · min 8 chars, 1 uppercase, 1 number
                </span>
              </Label>
              <Input
                placeholder="Create a strong password"
                className={inputStyles}
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              name="photoUrl"
              type="url"
              validate={(value) => {
                if (value && !/^https?:\/\/.+/i.test(value)) {
                  return "Please enter a valid URL";
                }
                return null;
              }}
            >
              <Label className={labelStyles}>
                Photo URL{" "}
                <span className="text-[#1B263B]/40 font-normal text-xs">
                  (optional)
                </span>
              </Label>
              <Input
                placeholder="https://example.com/photo.jpg"
                className={inputStyles}
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="group h-12 rounded-full bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0E1DD] mt-1 shadow-[0_12px_30px_rgba(13,27,42,0.2)] transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2 text-sm font-semibold tracking-tight w-full">
                {isSubmitting ? "Creating..." : "Create Account"}
                {!isSubmitting && (
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
              </span>
            </Button>
          </Form>

          {/* Footer link */}
          <p className="text-center text-sm text-[#1B263B]/70 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#415A77] font-semibold hover:text-[#0D1B2A] transition-colors duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default SignupForm;
