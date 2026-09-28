import HeroSection from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Nav from "@/components/landing/Nav";
import PlatformShowcase from "@/components/landing/PlatformShowcase";
import FinalCTA from "@/components/landing/FinalCTA";
import VoiceCloning from "@/components/landing/VoiceCloning";
import ProblemStatement from "@/components/landing/ProblemStatement";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <SocialProof />
      <ProblemStatement />
      <HowItWorks />
      <Features />
      <VoiceCloning />
      <PlatformShowcase />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
