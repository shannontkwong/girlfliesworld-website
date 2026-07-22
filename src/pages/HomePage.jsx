// src/pages/HomePage.jsx
//
// FLAT STRUCTURE RULE: every section on the homepage is imported and ordered
// HERE and only here. No section component may render another section.
// (Required edits to enforce this are listed at the bottom of this file.)

import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ManifestoSection from '../components/home/ManifestoSection';
import MissionTicker from '../components/home/MissionTicker';
import MissionSection from '../components/home/MissionSection';
import ScienceTeaserSection from '../components/home/Scienceteasersection';
import CredentialsStrip from '../components/home/BeyondFlight';
import StatsSection from '../components/home/StatsSection';
import PressLogoBar from '../components/home/PressLogoBar';
import PartnersCarousel from '../components/home/PartnersCarousel';
import ImageGridSection from '../components/home/ImageGridSection';
import SupportSection from '../components/home/SupportSection';
import SocialMediaSection from '../components/home/SocialMediaSection';
import Footer from '../components/layout/Footer';
import BoundariesSection from '../components/home/BoundariesSection';
import RouteGlobe from '../components/home/RouteGlobe';
import { feature } from 'topojson-client';

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ opacity: 1, transition: 'opacity 1s ease-in-out' }}>
      {/* ACT 1 — THE HOOK */}
      <HeroSection />          {/* science-first headline + CTAs */}
      <PartnersCarousel />     {/* partner logos */}
<RouteGlobe />
     <BoundariesSection />

      {/* ACT 2 — THE CASE */}
      <ScienceTeaserSection /> {/* EARS + route map -> /science */}

      <CredentialsStrip />     {/* publications, patent, RGS */}
      <StatsSection />         {/* endurance / exploration numbers */}

      {/* ACT 3 — THE PROOF */}
 
      {/* ACT 4 — THE ASK */}
      <Footer />
    </div>
  );
};

export default HomePage;

/* ─────────────────────────────────────────────────────────────
   REQUIRED DE-NESTING EDITS (do these or sections render twice):

   1. components/home/ImageGridSection.jsx
      - DELETE imports: PressLogoBar, PartnersCarousel,
        ScienceTeaserSection, CredentialsStrip
      - DELETE from its JSX: <PressLogoBar />, <PartnersCarousel />,
        <ScienceTeaserSection />, <CredentialsStrip />

   2. components/home/Scienceteasersection.jsx
      - DELETE imports: CredentialsStrip, WhyThisMattersSection
      - DELETE from its JSX: <WhyThisMattersSection />
      (WhyThisMatters is retired; the Manifesto replaced it.)

   3. Remove AnimatedBats + QuotationSection imports anywhere they remain.
   ───────────────────────────────────────────────────────────── */
