import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script, Oswald } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import Navigation from "./components/Navigation";
import ClientWrapper from "./components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: '--font-dancing-script',
});
const oswald = Oswald({ 
  subsets: ["latin"],
  variable: '--font-oswald',
  weight: ['200', '300', '400', '500', '600', '700']
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shyamnalluri.com"),
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
    url: "https://www.shyamnalluri.com",
    images: [
      {
        url: "/images/profile.jpg",
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
    creator: "@shyamnalluri",
    images: ["/images/profile.jpg"],
  },
  verification: {
    google: "verification-code",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overscroll-none">      <body
        className={`${inter.className} ${dancingScript.variable} ${oswald.variable} min-h-screen antialiased overscroll-none touch-manipulation`}
      ><ClientWrapper>
          <div className="overflow-x-hidden w-full">
            <Navigation />              {/* Mobile-first main content with responsive margin */}
            <main className="relative z-10 lg:ml-[214px]">
              {children}
            </main>
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}