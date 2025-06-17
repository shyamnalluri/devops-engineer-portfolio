'use client';

import dynamic from 'next/dynamic';
import Hero from "./sections/Hero";
import ClientWrapper from "./components/ClientWrapper";
import SkeletonScreen from './components/SkeletonScreen';
// Lazy load all sections except Hero
const About = dynamic(() => import("./sections/About"), {
  loading: () => <SkeletonScreen type="about" />,
  ssr: true
});

const Skills = dynamic(() => import("./sections/Skills"), {
  loading: () => <SkeletonScreen type="skills" />,
  ssr: true
});

const Projects = dynamic(() => import("./sections/Projects"), {
  loading: () => <SkeletonScreen type="projects" />,
  ssr: true
});

const Experience = dynamic(() => import("./sections/Experience"), {
  loading: () => <SkeletonScreen type="experience" />,
  ssr: true
});

const Certifications = dynamic(() => import("./sections/Certifications"), {
  loading: () => <SkeletonScreen type="certifications" />,
  ssr: true
});



const Contact = dynamic(() => import("./sections/Contact"), {
  loading: () => <SkeletonScreen type="contact" />,
  ssr: true
});

const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <div className="bg-gray-900 h-32"></div>,
  ssr: true
});

export default function Home() {
  return (
    <ClientWrapper>
      <main className="bg-black text-white min-h-screen">        {/* All sections - Impact-First Order */}        
        <Hero />
        <About />            
        <Projects />        {/* 🔥 Moved up - Show impact first! */}
        <Skills />          {/* Now provides context for the projects */}
        <Experience />      {/* Professional backing for the work shown */}
        <Certifications />  {/* Additional credibility */}
        <Contact />
        <Footer />
      </main>
    </ClientWrapper>
  );
}
