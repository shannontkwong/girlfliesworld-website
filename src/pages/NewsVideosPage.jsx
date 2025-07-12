import React from 'react';
import { Clock, Video, Newspaper, Bell } from 'lucide-react';

const NewsVideosPage = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'white'
    },
    hero: {
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '6rem 1.5rem 4rem 1.5rem',
      textAlign: 'center'
    },
    mainTitle: {
      fontSize: 'clamp(3rem, 8vw, 4.5rem)',
      fontWeight: '300',
      color: 'black',
      marginBottom: '2rem',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#6b7280',
      maxWidth: '32rem',
      margin: '0 auto',
      fontWeight: '300',
      lineHeight: '1.6'
    },
    mainContent: {
      maxWidth: '48rem',
      margin: '0 auto',
      padding: '5rem 1.5rem',
      textAlign: 'center'
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '3rem'
    },
    iconCircle: {
      width: '4rem',
      height: '4rem',
      border: '1px solid #d1d5db',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    comingSoonTitle: {
      fontSize: 'clamp(2.5rem, 6vw, 3rem)',
      fontWeight: '300',
      color: 'black',
      marginBottom: '2rem'
    },
    description: {
      fontSize: '1.125rem',
      color: '#6b7280',
      marginBottom: '4rem',
      maxWidth: '36rem',
      margin: '0 auto 4rem auto',
      fontWeight: '300',
      lineHeight: '1.8'
    },
    featureList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      marginBottom: '5rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    featureText: {
      color: '#374151',
      fontWeight: '300'
    },
    notificationSection: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '4rem'
    },
    notificationTitle: {
      fontSize: '1.5rem',
      fontWeight: '300',
      color: 'black',
      marginBottom: '1.5rem'
    },
    notificationText: {
      color: '#6b7280',
      marginBottom: '2rem',
      fontWeight: '300'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '20rem',
      margin: '0 auto'
    },
    input: {
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0',
      color: 'black',
      fontWeight: '300',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'black',
      color: 'white',
      fontWeight: '300',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      fontSize: '1rem'
    },
    bottomSpacer: {
      height: '8rem'
    }
  };

  // Media query styles
  const mediaStyles = `
    @media (min-width: 640px) {
      .form-container {
        flex-direction: row;
      }
    }
    
    .input:focus {
      border-color: black;
    }
    
    .button:hover {
      background-color: #1f2937;
    }
    
    .input::placeholder {
      color: #9ca3af;
    }
  `;

  return (
    <>
      <style>{mediaStyles}</style>
      <div style={styles.container}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <h1 style={styles.mainTitle}>
            News & Videos
          </h1>
          <p style={styles.subtitle}>
            The latest updates and content from our aviation journey.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div style={styles.mainContent}>
          {/* Minimalist Clock Icon */}
          <div style={styles.iconContainer}>
            <div style={styles.iconCircle}>
              <Clock size={32} color="#6b7280" strokeWidth={1} />
            </div>
          </div>

          <h2 style={styles.comingSoonTitle}>
            Coming Soon
          </h2>
          
          <p style={styles.description}>
            We're preparing something special. This space will feature our latest flight reports, 
            videos, and real-time updates.
          </p>

          {/* Clean Feature List */}
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <Newspaper size={20} color="#9ca3af" strokeWidth={1} />
              <span style={styles.featureText}>Flight Reports</span>
            </div>
            <div style={styles.featureItem}>
              <Video size={20} color="#9ca3af" strokeWidth={1} />
              <span style={styles.featureText}>Video Content</span>
            </div>
            <div style={styles.featureItem}>
              <Bell size={20} color="#9ca3af" strokeWidth={1} />
              <span style={styles.featureText}>Live Updates</span>
            </div>
          </div>

          {/* Minimal Notification Form */}
        
        </div>

        {/* Bottom spacing */}
      </div>
    </>
  );
};

export default NewsVideosPage;
