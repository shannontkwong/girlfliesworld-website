import React from 'react';

const QuotationSection = () => {
  const bottomImage = 'si.png'; // Replace with another image below the quote
  
  return (
    <section style={{
      padding: '5rem 2rem',
      color: 'white',
      background: '#FF5500',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <blockquote style={{
          fontSize: '1.8rem',
          fontFamily: "'Playfair Display', 'Georgia', serif",
          fontWeight: 500,
          fontStyle: 'italic',
          lineHeight: 1.5,
          color: '#fff',
          margin: '0 0 1rem 0',
          quotes: '"" ""'
        }}>
          "Don't be absurd. Be absurdly different"
        </blockquote>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#fff',
          marginBottom: '3rem',
          fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
          letterSpacing: '0.5px'
        }}>
        </p>
        
        <img 
          src={bottomImage} 
          alt="Mission" 
          style={{
            width: '50%',
            maxHeight: '100px',
            objectFit: 'cover',
            borderRadius: '10px'
          }}
        />
      </div>
    </section>
  );
};

export default QuotationSection;
