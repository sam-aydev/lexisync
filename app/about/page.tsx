import AboutUs from "@/components/about/AboutUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We are building the autonomous engine for human creators. Learn about the mission and team behind Sociarig.",
  keywords: [
    "About Sociarig",
    "AI startup",
    "content creation company",
    "our mission",
    "founder story",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
  },
  openGraph: {
    title: "About Us | Sociarig",
    description:
      "Empowering founders and creators to scale their authentic voice autonomously.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
    siteName: "Sociarig",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AboutUs />;
}
