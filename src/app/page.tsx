'use client';

import Hero from "./sections/Hero";
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import Portfolio from "./sections/Portfolio";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Resume from "./sections/Resume";
import ClientWrapper from "./components/ClientWrapper";

export default function Home() {
  return (
    <ClientWrapper>
      <main className="bg-gray-900">
        <div id="content">
          <Hero />
          <About />
          <Expertise />
          <Resume />
          <Portfolio />
          <Achievements />
          <Contact />
        </div>
      </main>
    </ClientWrapper>
  );
}
