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

const Testimonials = dynamic(() => import("./sections/Testimonials"), {
  loading: () => <SkeletonScreen type="testimonials" />,
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

export default function Home() {
  return (
    <ClientWrapper>
      <main className="bg-black text-white min-h-screen">
        {/* All sections */}        <Hero />
        <About />            <Skills />
        <Experience />
        <Testimonials />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </ClientWrapper>
  );
}
