// src/pages/PlanePage.jsx
import React from 'react';
import Footer from '../components/layout/Footer';
import PlaneInfo from '../components/plane/PlaneInfo';

const PlanePage = () => {
  const pageStyle = {
    paddingTop: '80px',
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
