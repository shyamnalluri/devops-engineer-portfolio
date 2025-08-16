import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevOps Runner | Shyam Nalluri",
  description: "Play the DevOps runner game - avoid Jenkins obstacles while being chased by AI!",
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <div className="fixed top-6 left-6 z-50">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm text-white px-5 py-3 rounded-lg hover:bg-gray-800/80 transition-all shadow-lg border border-gray-700/50 group"
          >
            <svg className="w-3.5 h-3.5 text-blue-400 group-hover:transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
