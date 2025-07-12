import React from 'react';

const VideosPage = () => {
  const styles = {
    section: {
      minHeight: '100vh',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    container: {
      textAlign: 'center',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 300,
      color: 'black',
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.125rem',
      fontWeight: 300,
      color: '#6b7280',
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Coming Soon</h1>
        <p style={styles.paragraph}>The video section is under construction.</p>
      </div>
    </section>
  );
};

export default VideosPage;
