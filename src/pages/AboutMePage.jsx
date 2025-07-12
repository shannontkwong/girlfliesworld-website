import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutMePage = () => {
  const [modalImage, setModalImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryImages = [
    { src: '/plan.png', alt: 'Shannon Walking' },
    { src: '/fuel.png', alt: 'Shannon Portrait' },
    { src: '/hat.png', alt: 'Shannon Mode' },
  ];

  const sectionStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: isMobile ? '40px auto' : '60px auto',
    padding: isMobile ? '15px' : '20px',
    gap: isMobile ? '20px' : '40px',
    fontFamily: 'Poppins, sans-serif',
    flexWrap: 'wrap',
    flexDirection: isMobile ? 'column' : 'row'
  };

  const imageStyle = {
    width: isMobile ? '100%' : '400px',
    maxWidth: isMobile ? '350px' : '400px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const textBlockStyle = {
    maxWidth: isMobile ? '100%' : '600px',
    lineHeight: '1.7',
    textAlign: 'justify',
    color: '#333',
    fontSize: isMobile ? '16px' : '17px'
  };

  const headingStyle = {
    fontSize: isMobile ? 'clamp(24px, 6vw, 32px)' : '32px',
    marginBottom: '15px',
    fontWeight: '700',
    color: '#000'
  };

  // Different highlight colors
  const highlights = {
    pink: { color: '#f60d85e5', fontWeight: '600' },
    blue: { color: '#3b82f6', fontWeight: '600' },
    purple: { color: '#8b5cf6', fontWeight: '600' },
    orange: { color: '#f97316', fontWeight: '600' },
    yellow: { color: '#eab308', fontWeight: '600' },
    green: { color: '#10b981', fontWeight: '600' },
    red: { color: '#ef4444', fontWeight: '600' }
  };

  const pageStyle = { 
    paddingTop: isMobile ? '60px' : '80px',
    paddingLeft: isMobile ? '10px' : '0',
    paddingRight: isMobile ? '10px' : '0'
  };

  const galleryContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: isMobile ? '15px' : '20px',
    padding: isMobile ? '30px 10px' : '50px 20px'
  };

  const galleryStyle = {
    margin: '5px',
    border: '1px solid #ccc',
    width: isMobile ? 'calc(50% - 15px)' : '348px',
    maxWidth: isMobile ? '200px' : '348px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const galleryImageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'pointer'
  };

  const modalImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    borderRadius: '10px'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '30px',
    fontSize: isMobile ? '30px' : '40px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const heroContainerStyle = {
    position: 'relative',
    width: '100%',
    height: isMobile ? '60vh' : '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    padding: isMobile ? '0 15px' : '0 60px',
    boxSizing: 'border-box'
  };

  const heroContentStyle = {
    flex: '1 1 50%',
    paddingLeft: isMobile ? '0' : '650px',
    fontFamily: "'Outfit', sans-serif",
    color: '#111',
    textAlign: isMobile ? 'center' : 'left'
  };

  const heroTitleStyle = {
    fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : '64px',
    fontFamily: "'Outfit', sans-serif",
    color: '#fff',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '2px 4px 8px rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
  };

  const heroSubtitleStyle = {
    fontSize: isMobile ? '16px' : '20px',
    lineHeight: '1.6',
    maxWidth: isMobile ? '100%' : '500px',
    color: '#fff',
    textShadow: '1px 2px 6px rgba(0, 0, 0, 0.6)'
  };

  const openModal = (imageSrc, imageAlt) => {
    setModalImage({ src: imageSrc, alt: imageAlt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div style={pageStyle}>
      {/* Modal for image zoom */}
      {modalImage && (
        <div style={modalStyle} onClick={closeModal}>
          <span style={closeButtonStyle}>&times;</span>
          <img
            src={modalImage.src}
            alt={modalImage.alt}
            style={modalImageStyle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Full-Width Hero Banner */}
      <div style={heroContainerStyle}>
        {/* Background Image */}
        <img
          src="/landsc.png"
          alt="Shannon Hero"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center' : 'center',
            zIndex: 1,
            cursor: 'pointer'
          }}
          onClick={() => openModal('/landsc.png', 'Shannon Hero')}
        />

        {/* Foreground Content */}
        <div style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap',
        }}>
          {/* Text Content */}
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>
              <span>Hi, I'm&nbsp;</span>
              <span style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#fff',
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)'
              }}>
                Shannon
              </span>
            </h1>

            <p style={heroSubtitleStyle}>
              I'm a 19-year-old aviator, explorer, and tech founder preparing to fly solo to the South Pole and across all seven continents. My mission is to inspire bold thinking, scientific curiosity, and radical self-belief.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section style={sectionStyle}>
        <img 
          src="/side.png" 
          style={imageStyle} 
          alt="Shannon Wong" 
          onClick={() => openModal('/side.png', 'Shannon Wong')}
        />
        <div style={textBlockStyle}>
          <h2 style={headingStyle}>
            About{' '}
            <img 
              src="/sig.png" 
              alt="Shannon Wong Signature" 
              style={{ 
                height: isMobile ? '3em' : '4.5em',
                verticalAlign: 'middle', 
                marginLeft: '0.3em',
                cursor: 'pointer'
              }}
              onClick={() => openModal('/sig.png', 'Shannon Wong Signature')}
            />
          </h2>

          <p>
            <span style={highlights.pink}>Shannon Wong</span> is a 19-year-old aviator, explorer, and tech founder born in Hong Kong and currently based in the South of France. A British national, she immigrated to France at age 15 due to Brexit and political instability in Hong Kong, leaving behind her family, friends, and everything familiar. She is now pursuing her dream of becoming a <span style={highlights.blue}>design engineer</span> and <span style={highlights.purple}>inventor</span> in the U.S. while preparing to launch one of the boldest aviation expeditions in modern history.
          </p>
        </div>
      </section>

      {/* Who is Shannon Wong Section */}
      <section style={sectionStyle}>
        <div style={textBlockStyle}>
          <h3 style={headingStyle}>
            Who is <span style={highlights.orange}>Shannon Wong?</span>
          </h3>
          <p>
            Shannon is on a mission to <span style={highlights.green}>redefine what's possible</span>. She's taking several gap years to complete her journey, planning either to
            continue her studies or scale her <span style={highlights.blue}>software startup</span> in the U.S.
          </p>

          <p>Fun facts:</p>
          <ul style={{
            paddingLeft: '20px',
            marginTop: '0.5rem',
            marginBottom: '1.5rem',
            color: '#333',
            fontSize: isMobile ? '14px' : '1rem',
            lineHeight: '1.5',
            maxWidth: '600px',
          }}>
            {[
              "At 10 years old, Shannon taught herself programming and hacked into her school's system",
              "At 11 years old, teachers told her she was a gifted artist",
              "At 15, Shannon became an electronics hobbyist and started experimenting with engineering fully autonomous delivery drones, computers, and frequency counters",
              "At 16, Shannon was introduced to the aviation world through microlight flying (Ikarus C42's)",
              "At 18, Shannon taught herself ML/AI, launched her software startup, and is currently a solo founder",
            ].map((fact, i) => (
              <li key={i} style={{
                marginBottom: '12px',
                borderRadius: '8px',
                padding: '8px 12px',
              }}>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <img 
          src="/lol.png" 
          style={imageStyle} 
          alt="Shannon Walking" 
          onClick={() => openModal('/lol.png', 'Shannon Walking')}
        />
      </section>

      {/* Early Life Section */}
      <section style={sectionStyle}>
        <img 
          src="/snow.png" 
          style={imageStyle} 
          alt="Shannon Portrait" 
          onClick={() => openModal('/snow.png', 'Shannon Portrait')}
        />
        <div style={textBlockStyle}>
          <h3 style={headingStyle}>Overcoming <span style={highlights.red}>Adversity</span></h3>
          <p>
            Raised by a single father who grew up <span style={highlights.yellow}>poor</span>, working jobs like selling shoes and waiting tables before putting himself through college at 25, Shannon faced profound challenges early in life. At just 10 years old, she was responsible for caring for her mother—preparing pills and medicine every morning—until her mother sadly passed away from <span style={highlights.purple}>breast cancer</span> that same year.

            <br></br><br></br>The year brought even more hardship: Shannon was bullied at school, her grandmother died of breast cancer, and a year later her grandfather passed away after a coma. Family conflicts led to more than a decade of court battles, and a tragic car accident soon after nearly left Shannon orphaned.

            <br></br><br></br>Despite these overwhelming difficulties, Shannon struggled in traditional schools but found early success in <span style={highlights.green}>art</span>. Her passion and curiosity, however, ultimately pushed her toward <span style={highlights.orange}>science and flight</span>—defying the odds to carve her own path.
          </p>
        </div>
      </section>

      {/* Self-Taught Journey Section */}
      <section style={sectionStyle}>
        <div style={textBlockStyle}>
          <h3 style={headingStyle}>From <span style={highlights.blue}>Hacking</span> to <span style={highlights.purple}>Flight</span></h3>
          <p>
            At 10, Shannon taught herself <span style={highlights.red}>ethical hacking</span>. At 15, she dove deep into <span style={highlights.orange}>electronics</span>, building her own circuits and
            exploring how hardware and software worked. She began flying <span style={highlights.green}>microlights</span> at 16 and later trained for her private pilot license.
          </p>
          <br></br>
          <p>To prepare, Shannon has taken a <span style={highlights.blue}>winter survival course</span> which included pulling a 50kg up the Norwegian mountains in -15C weather for 8 hrs a day for 1 week (equivalent to 23 miles daily) in case her engine quits over <span style={highlights.yellow}>Antarctica</span>.
          </p>
        </div>
        <img 
          src="/hack.png" 
          style={imageStyle} 
          alt="Shannon Mode" 
          onClick={() => openModal('/hack.png', 'Shannon Mode')}
        />
      </section>

      {/* The Mission Section */}
      <section style={sectionStyle}>
        <img 
          src="/s.jpg" 
          style={imageStyle} 
          alt="Shannon Fun" 
          onClick={() => openModal('/s.jpg', 'Shannon Fun')}
        />
        <div style={textBlockStyle}>
          <h3 style={headingStyle}>The <span style={highlights.blue}>South Pole</span> Mission</h3>
          <p>
            In October 2026, Shannon will attempt to fly solo across all continents and land in <span style={highlights.purple}>Antarctica</span>—becoming the first woman to fly
            a small plane to the <span style={highlights.orange}>South Pole</span> and the first woman ever to fly solo across all <span style={highlights.green}>seven continents</span> (westbound).
          </p>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section style={sectionStyle}>
        <div style={textBlockStyle}>
          <h3 style={headingStyle}>Why It <span style={highlights.pink}>Matters</span></h3>
          <p>
            This mission isn't just about records. It's about proving that no background, limitation, or obstacle should ever define us.
            Shannon wants to inspire <span style={highlights.purple}>youth</span>—especially <span style={highlights.orange}>girls</span>—to embrace <span style={highlights.green}>science</span>, <span style={highlights.red}>exploration</span>, and <span style={highlights.yellow}>radical self-belief</span>.
          </p>
          <div style={{ marginTop: '20px' }}>
          <Link to="/journey" style={{ textDecoration: 'none' }}>
  <button style={{
    fontSize: isMobile ? '16px' : '18px',
    background: 'black',
    color: '#fff',
    textDecoration: 'none',
    border: 'none',
    padding: isMobile ? '10px 20px' : '12px 25px',
    borderRadius: '6px',
    transition: '0.5s',
    cursor: 'pointer'
  }}>
    Track the Journey
  </button>
</Link>

          </div>
        </div>
        <img 
          src="/homer.jpg" 
          style={imageStyle} 
          alt="Shannon's Mission" 
          onClick={() => openModal('/plan.png', "Shannon's Mission")}
        />
      </section>

      {/* Photo Gallery */}
      <div style={galleryContainerStyle}>
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            style={galleryStyle}
            onClick={() => openModal(image.src, image.alt)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={image.src} alt={image.alt} style={galleryImageStyle} />
          </div>
        ))}
      </div>

      {/* Simple Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: isMobile ? '15px' : '20px',
        marginTop: isMobile ? '30px' : '50px'
      }}>
        <p>&copy; 2025 Shannon Wong. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutMePage;
