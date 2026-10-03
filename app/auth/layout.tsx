import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In or Create Account",
  description:
    "Access your Sociarig workspace to manage your brand voices, or create a free account to start turning single links into a month's worth of social content.",
  keywords: [
    "Sociarig login",
    "Sociarig signup",
    "create AI content account",
    "access workspace",
    "AI repurposing tool login"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/auth`,
  },
  openGraph: {
    title: "Sign In or Create Account | Sociarig",
    description:
      "Access your workspace or start generating highly-aligned social content for free.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth`,
    siteName: "Sociarig",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In or Create Account | Sociarig",
    description: "Access your workspace or start generating content for free.",
  },
  robots: {
    // We want search engines to index the login/signup pages so users can find them easily
    index: true,
    follow: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}