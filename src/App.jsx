import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Certificates } from './components/Certificates';
import { CertificateModal } from './components/CertificateModal';
import { Achievements } from './components/Achievements';
import { MediaLightbox } from './components/MediaLightbox';
import { Resume } from './components/Resume';
import { LinkedIn } from './components/LinkedIn';
import { GitHub } from './components/GitHub';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PrashWebAI } from './components/PrashWebAI';
import { AdminModal } from './components/AdminModal';

export const App = () => {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Certificates />
          <Achievements />
          <Resume />
          <LinkedIn />
          <GitHub />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Overlays & Modals */}
        <ProjectModal />
        <CertificateModal />
        <MediaLightbox />
        <PrashWebAI />
        <AdminModal />
      </div>
    </PortfolioProvider>
  );
};

export default App;
