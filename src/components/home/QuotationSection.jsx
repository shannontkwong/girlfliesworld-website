import React from 'react';
import './QuotationSection.css'; // Make sure this CSS file is in the same folder

const QuotationSection = () => {
  const bottomImage = 'si.png'; // Replace with another image below the quote

  return (
    <section className="quote-section">
      <div className="quote-container">

        <blockquote className="quote-text">
        "Fear is a relative term. I only play in absolutes".        </blockquote>

        <p className="quote-author">— Shannon Wong</p>

        <img src={bottomImage} alt="Mission" className="quote-bottom-image" />
      </div>
    </section>
  );
};

export default QuotationSection;
