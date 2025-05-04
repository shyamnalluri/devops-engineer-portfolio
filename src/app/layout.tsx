import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import ClientWrapper from "./components/ClientWrapper";
import ParticleBackground from "./components/ParticleBackground";
import BackToTop from "./components/BackToTop";
import ScrollProgressBar from "./components/ScrollProgressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shyam Nalluri | DevOps Engineer",
  description:
    "DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions. Expertise in AWS, Kubernetes, and CI/CD pipelines.",
  keywords: [
    "DevOps",
    "Cloud Architecture",
    "AWS",
    "Kubernetes",
    "CI/CD",
    "Infrastructure as Code",
    "Automation",
  ],
  authors: [{ name: "Shyam Nalluri" }],
  creator: "Shyam Nalluri",
  publisher: "Shyam Nalluri",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.yourwebsite.com",
  },
  openGraph: {
    type: "website",
    title: "Shyam Nalluri - DevOps Engineer",
    description:
      "DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions.",
    siteName: "Shyam Nalluri Portfolio",
    url: "https://www.yourwebsite.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shyam Nalluri - DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shyam Nalluri - DevOps Engineer",
    description:
      "DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions.",
    creator: "@yourtwitterhandle",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "theme-color": "#1e293b",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className={`${inter.className} overscroll-none`}>
        <ClientWrapper>
          <ScrollProgressBar />
          <ParticleBackground />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <BackToTop />
        </ClientWrapper>
      </body>
    </html>
  );
}
