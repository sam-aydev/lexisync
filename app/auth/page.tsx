"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { loginUser, signUpUser } from "../lib/util/actions/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const { replace, push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Call the appropriate server action based on the active tab
      const { error, route, success }: any =
        mode === "login"
          ? await loginUser(formData)
          : await signUpUser(formData);

      console.log(error);
      if (error) {
        toast.error(mode === "login" ? "Login Failed" : "Signup Failed", {
          description: error,
        });
      } else if (success && route) {
        // 3. ACTUAL REDIRECT TRIGGERED BY CLIENT
        push(route);
        toast.success("Welcome to Sociarig!");
      } else if (mode === "signup") {
        // If sign up doesn't return an error and requires email confirmation
        // Note: You can remove this toast if you have auto-confirm enabled in Supabase
        // toast.success("Check your email", {
        //   description:
        //     "We sent you a confirmation link to complete your setup.",
        // });
      }
    } catch (error) {
      console.log("Auth Exception:", error);

      toast.error("An unexpected error occurred", {
        // Force the toast to show the actual error message
        description: error instanceof Error ? error.message : String(error),
      });
      // toast.error("An unexpected error occurred", {
      //   description:
      //     "Please try again or contact support if the issue persists.",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-sans relative overflow-hidden">
      {/* 1. Global Navigation */}
      <div className="z-50 shrink-0">
        <Nav />
      </div>

      {/* 2. Ambient Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[80%] max-w-[500px] aspect-square bg-signal blur-[100px] lg:blur-[120px] rounded-full opacity-10 translate-x-1/4 -translate-y-1/4"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-[70%] max-w-[400px] aspect-square bg-ember blur-[100px] lg:blur-[120px] rounded-full opacity-5 -translate-x-1/3 translate-y-1/3"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,27,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,21,27,0.03)_1px,transparent_1px)] bg-[size:30px_30px] lg:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      {/* 3. Auth Form Container */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 md:pt-36 pb-8 px-4 lg:px-6 relative z-10 w-full min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px] bg-white border border-ink/10 rounded-2xl lg:rounded-[var(--radius-xl)] shadow-[0_20px_60px_-15px_rgba(18,21,27,0.08)] p-6 sm:p-8 lg:p-10 mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8 space-y-1.5 lg:space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-3xl lg:text-4xl font-semibold tracking-tight text-ink">
              {mode === "login" ? "Welcome back" : "Start generating"}
            </h1>
            <p className="text-ink-soft text-[13px] sm:text-sm lg:text-base px-2">
              {mode === "login"
                ? "Sign in to access your brand voices."
                : "Create an account to scale your content."}
            </p>
          </div>

          {/* Animated Toggle */}
          <div className="flex p-1 bg-paper border border-ink/5 rounded-xl mb-6 lg:mb-8 relative w-full overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setIsLoading(false); // Reset loading state if switching modes rapidly
              }}
              className={`flex-1 cursor-pointer py-2.5 text-[13px] lg:text-sm font-medium transition-colors relative z-10 ${mode === "login" ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setIsLoading(false);
              }}
              className={`flex-1 cursor-pointer py-2.5 text-[13px] lg:text-sm font-medium transition-colors relative z-10 ${mode === "signup" ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              Sign Up
            </button>

            <motion.div
              layoutId="active-auth-tab"
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm border border-ink/5"
              animate={{ x: mode === "login" ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ left: "4px" }}
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 lg:space-y-5 w-full"
          >
            <div className="space-y-4 w-full">
              <div className="space-y-1.5 w-full">
                <label className="text-[13px] lg:text-sm font-medium text-ink block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="w-full px-3.5 py-3 lg:px-4 lg:py-3.5 bg-paper-dim/30 border border-ink/10 rounded-lg lg:rounded-xl text-[13px] lg:text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm placeholder:text-ink-faint"
                />
              </div>

              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] lg:text-sm font-medium text-ink block">
                    Password
                  </label>
                  {mode === "login" && (
                    <a
                      href="#"
                      className="text-[11px] lg:text-xs text-signal font-medium hover:underline"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  minLength={6} // Supabase default minimum is 6
                  className="w-full px-3.5 py-3 lg:px-4 lg:py-3.5 bg-paper-dim/30 border border-ink/10 rounded-lg lg:rounded-xl text-[13px] lg:text-sm focus:outline-none focus:ring-2 focus:ring-signal/20 focus:border-signal transition-all shadow-sm placeholder:text-ink-faint"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer py-3.5 mt-2 bg-ink text-paper rounded-lg lg:rounded-xl font-medium text-[13px] lg:text-sm transition-all hover:bg-ink-soft hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              ) : mode === "login" ? (
                "Sign In to Workspace"
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          {/* Legal */}
          <div className="mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-ink/5">
            <p className="text-center text-[11px] lg:text-xs text-ink-faint leading-relaxed px-2">
              Protected by enterprise-grade encryption. By continuing, you agree
              to our{" "}
              <a href="#" className="text-ink hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-ink hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
