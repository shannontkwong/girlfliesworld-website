// src/pages/PlanePage.jsx
import React, { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';
import PlaneInfo from '../components/plane/PlaneInfo';

const PlanePage = () => {
  const [headerHeight, setHeaderHeight] = useState(120);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
    const handler = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handler);
    return () => window.removeEventListener('site-header-resize', handler);
  }, []);

  const pageStyle = {
    paddingTop: `${headerHeight}px`,
    fontFamily: 'Poppins, sans-serif'
  };

  const contentStyle = {
    paddingLeft: '80px',
    paddingRight: '80px'
  };

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <PlaneInfo />
      </div>
      <Footer />
    </div>
  );
};

export default PlanePage;
