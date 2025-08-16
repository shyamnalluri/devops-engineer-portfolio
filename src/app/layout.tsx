import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script, Oswald } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import Navigation from "./components/Navigation";
import Script from "next/script";
import ClientWrapper from "./components/ClientWrapper";
import WebVitals from "./components/WebVitals";
import { siteUrl, ogImageUrl, siteMeta } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: '--font-dancing-script',
});
const oswald = Oswald({ 
  subsets: ["latin"],
  variable: '--font-oswald',
  weight: ['400', '700']
});

// Centralized site configuration imported from src/config/site

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: siteMeta.keywords,
  authors: [{ name: "Shyam Nalluri" }],
  creator: "Shyam Nalluri",
  publisher: "Shyam Nalluri",
  robots: "index, follow",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    title: "Shyam Nalluri - DevOps Engineer",
    description:
      "DevOps Engineer specializing in cloud infrastructure, automation, and scalable solutions.",
    siteName: "Shyam Nalluri Portfolio",
    url: siteUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Shyam Nalluri - DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shyam Nalluri - DevOps Engineer",
    description: siteMeta.description,
    creator: siteMeta.twitterCreator,
    images: [ogImageUrl],
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
  const gtagId: string | undefined = process.env.NEXT_PUBLIC_GTAG_ID;
  return (
    <html lang="en" className="scroll-smooth overscroll-none">      
    <body
        className={`${inter.className} ${dancingScript.variable} ${oswald.variable} min-h-screen antialiased overscroll-none touch-manipulation`}
      >{gtagId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${gtagId}', {
                  page_path: window.location.pathname
                });
              `}
            </Script>
          </>
        )}<a
          href="#main"
          className="fixed top-2 left-2 z-[100] -translate-y-16 focus:translate-y-0 transition transform bg-orange-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to content
        </a>{gtagId ? <WebVitals /> : null}<ClientWrapper>
          <div className="overflow-x-hidden w-full">
            <Navigation />              {/* Mobile-first main content with responsive margin */}
            <main id="main" tabIndex={-1} className="relative z-10 lg:ml-[180px] focus:outline-none">
              {children}
            </main>
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}