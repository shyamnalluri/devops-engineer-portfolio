import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

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
            <FaArrowLeft size={14} className="text-blue-400 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
