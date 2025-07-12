// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ImageGridSection from '../components/home/ImageGridSection';
import MissionSection from '../components/home/MissionSection';
import SocialMediaSection from '../components/home/SocialMediaSection';
import Footer from '../components/layout/Footer';
import AnimatedBats from '../components/home/AnimatedBats';
import QuotationSection from '../components/home/QuotationSection';

const HomePage = () => {
  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const mainContentStyle = {
    opacity: 1,
    transition: 'opacity 1s ease-in-out'
  };

  return (
    <div style={mainContentStyle}>
      <HeroSection />
      <ImageGridSection />
      <MissionSection />
      <StatsSection />
     
    <QuotationSection />
      <SocialMediaSection />
      <Footer />
    </div>
  );
};

export default HomePage;
