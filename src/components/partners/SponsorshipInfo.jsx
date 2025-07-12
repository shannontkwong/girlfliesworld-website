import React from 'react';
import './SponsorshipInfo.css';

const SponsorshipInfo = () => {
  const benefits = [
    'Logo appearance on the plane\'s fuselage',
    'Appearance in documentary film',
    'Presence on social media'
  ];

  return (
    <div className="responsive-container-block sponsorship-container">
      <div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6">
        <img src="sponsored.png" alt="Sponsorship opportunities" className="responsive-image" />
      </div>
      <div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6">
        <div className="text-content">
          <h2 className="heading-text">SPONSOR ME</h2>
          <ul className="sponsor-list">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
            <li className="contact-item">
              <span className="mail-icon">✉</span>
              Interested in sponsoring? 
              <a href="mailto:contact@girlfliesworld.com"> contact@girlfliesworld.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipInfo;
