'use client';

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Portfolio from "./sections/Portfolio";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Resume from "./sections/Resume";
import Certifications from "./sections/Certifications";
import ClientWrapper from "./components/ClientWrapper";

export default function Home() {
  return (
    <ClientWrapper>
      <main className="bg-gray-900">
        <div id="content">
          <Hero />
          <About />
          <Skills />
          <Resume />
          <Portfolio />
          <Certifications />
          <Achievements />
          <Contact />
        </div>
      </main>
    </ClientWrapper>
  );
}
