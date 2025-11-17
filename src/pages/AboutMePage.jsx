import React, { useState, useEffect } from 'react';

// Import Footer component
const Footer = () => {
  const footerStyle = {
    background: '#000000',
    color: '#ffffff',
    padding: '4rem 2rem 2rem',
    marginTop: '4rem'
  };

  const footerRowStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    alignItems: 'start'
  };

  const footerColStyle = {
    color: '#ffffff'
  };

  const logoColStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const h4Style = {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: 'rgb(255, 30, 154)'
  };

  const linksStyle = {
    listStyle: 'none',
    padding: 0
  };

  const linkItemStyle = {
    marginBottom: '0.8rem'
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  const logoStyle = {
    maxWidth: '200px',
    height: 'auto',
    marginBottom: '1rem'
  };

  const missionTextStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    maxWidth: '300px'
  };

  const footerBottomStyle = {
    textAlign: 'center',
    paddingTop: '2rem',
    marginTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    opacity: 0.7
  };

  return (
    <footer style={footerStyle}>
      <div style={footerRowStyle}>
        <div style={footerColStyle}>
          <h4 style={h4Style}>Info</h4>
          <ul style={linksStyle}>
            <li style={linkItemStyle}><a href="/aboutme" style={linkStyle}>About Me</a></li>
            <li style={linkItemStyle}><a href="/journey" style={linkStyle}>My Journey</a></li>
            <li style={linkItemStyle}><a href="/team" style={linkStyle}>Team</a></li>
            <li style={linkItemStyle}><a href="/contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>
        <div style={footerColStyle}>
          <h4 style={h4Style}>Explore</h4>
          <ul style={linksStyle}>
            <li style={linkItemStyle}><a href="/plane" style={linkStyle}>The Plane</a></li>
            <li style={linkItemStyle}><a href="/aboutme" style={linkStyle}>The Record Attempt</a></li>
            <li style={linkItemStyle}><a href="/sponsors" style={linkStyle}>Become a Sponsor</a></li>
            <li style={linkItemStyle}><a href="/blog" style={linkStyle}>Blog</a></li>
          </ul>
        </div>
        <div style={logoColStyle}>
          <img
            src='/si.png'
            alt="GIRLFLIESWORLD Logo"
            style={logoStyle}
          />
          <p style={missionTextStyle}>
            First woman to fly solo to all 7 continents and the South Pole.
            Inspiring the next generation of aviators and explorers.
          </p>
        </div>
      </div>
      <div style={footerBottomStyle}>
        <p>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p>
      </div>
    </footer>
  );
};

const AboutMePage = () => {
  const [activeSection, setActiveSection] = useState('journey');
  const [modalImage, setModalImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { id: 'journey', label: 'The Journey' },
    { id: 'mission', label: 'The Mission' },
    { id: 'background', label: 'Background' },
    { id: 'adversity', label: 'Overcoming Adversity' },
    { id: 'skills', label: 'Self-Taught Skills' },
    { id: 'south-pole', label: 'South Pole Mission' },
    { id: 'impact', label: 'Why It Matters' },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const openModal = (imageSrc, imageAlt) => {
    setModalImage({ src: imageSrc, alt: imageAlt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Styles
  const pageStyle = {
    paddingTop: isMobile ? '60px' : '80px',
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff'
  };

  const sidebarStyle = {
    width: isMobile ? '0' : '280px',
    backgroundColor: '#C4A574',
    position: 'fixed',
    left: 0,
    top: isMobile ? '60px' : '80px',
    height: 'calc(100vh - 80px)',
    padding: '2rem 0',
    overflowY: 'auto',
    zIndex: 10,
    display: isMobile ? 'none' : 'block'
  };

  const mainContentStyle = {
    marginLeft: isMobile ? '0' : '280px',
    flex: 1,
    padding: isMobile ? '1rem' : '2rem 3rem',
    backgroundColor: '#fff'
  };

  const navigationItemStyle = (isActive) => ({
    display: 'block',
    padding: '1rem 2rem',
    color: isActive ? '#fff' : '#000',
    textDecoration: 'none',
    fontSize: isActive ? '1rem' : '0.9rem',
    fontWeight: isActive ? '700' : '500',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'transparent'
  });

  const sectionStyle = {
    marginBottom: '4rem',
    paddingBottom: '2rem'
  };

  const titleStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? '2.5rem' : '3.5rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: '2rem',
    lineHeight: 1.1,
    letterSpacing: '-0.02em'
  };

  const sectionTitleStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? '1.8rem' : '2.2rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em'
  };

  const paragraphStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'left',
    marginBottom: '1.5rem',
    maxWidth: '800px'
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    marginBottom: '2rem'
  };

  const heroImageStyle = {
    width: '100%',
    height: isMobile ? '40vh' : '80vh',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '3rem'
  };

  const galleryContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginTop: '2rem'
  };

  const galleryImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
    borderRadius: '8px'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '30px',
    fontSize: '40px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const highlights = {
    pink: { color: '#f60d85e5', fontWeight: '600' },
    blue: { color: '#3b82f6', fontWeight: '600' },
    purple: { color: '#8b5cf6', fontWeight: '600' },
    orange: { color: '#f97316', fontWeight: '600' },
    yellow: { color: '#eab308', fontWeight: '600' },
    green: { color: '#10b981', fontWeight: '600' },
    red: { color: '#ef4444', fontWeight: '600' }
  };

  const galleryImages = [
    { src: '/plan.png', alt: 'Shannon Walking' },
    { src: '/fuel.png', alt: 'Shannon Portrait' },
    { src: '/hat.png', alt: 'Shannon Mode' },
    { src: '/snow.png', alt: 'Shannon Portrait' },
    { src: '/hack.png', alt: 'Shannon Mode' },
    { src: '/s.jpg', alt: 'Shannon Fun' }
  ];

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

      {/* Sidebar Navigation */}
      <nav style={sidebarStyle}>
        {navigationItems.map((item) => (
          <div
            key={item.id}
            style={navigationItemStyle(activeSection === item.id)}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </div>
        ))}
      </nav>

      {/* Main Content */}
      <main style={mainContentStyle}>
        {/* Hero Section */}
        <section id="journey" style={sectionStyle}>
          <h1 style={titleStyle}>Shannon Around the World</h1>
          <img
            src="/landsc.png"
            alt="Shannon Hero"
            style={heroImageStyle}
            onClick={() => openModal('/landsc.png', 'Shannon Hero')}
          />
          <p style={paragraphStyle}>
          Shannon's journey takes her to people and places all over the globe—even those who once feared flying. From overcoming profound personal challenges to preparing for one of the boldest aviation expeditions in modern history, her mission is to inspire a new generation to think boldly, explore fearlessly, and believe deeply in themselves.          </p>
        </section>

        {/* Mission Section */}
        <section id="mission" style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Shannon's Mission</h2>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <p style={paragraphStyle}>
              <span style={highlights.pink}>Shannon Wong</span> is a 19-year-old aviator, explorer, and tech founder preparing to fly solo to the <span style={highlights.blue}>South Pole</span> and across all <span style={highlights.purple}>seven continents</span>. Her mission is to inspire a new generation to think boldly, explore fearlessly, and believe deeply in themselves — encouraging young people everywhere to pursue science, discovery, and exploration.
              </p>
              <p style={paragraphStyle}>
                In October 2026, Shannon will attempt to become the first woman to fly a small plane to the South Pole and the first woman ever to fly solo across all seven continents westbound. This expedition represents more than aviation records—it's about proving that no background, limitation, or obstacle should ever define us.
              </p>
            </div>
            <img
              src="/side.png"
              alt="Shannon Wong"
              style={{ ...imageStyle, maxWidth: '300px', height: '250px', objectFit: 'cover' }}
              onClick={() => openModal('/side.png', 'Shannon Wong')}
            />
          </div>
        </section>

        {/* Background Section */}
        <section id="background" style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Background</h2>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', gap: '2rem', alignItems: 'flex-start' }}>
            <img
              src="/lol.png"
              alt="Shannon Walking"
              style={{ ...imageStyle, maxWidth: '300px' }}
              onClick={() => openModal('/lol.png', 'Shannon Walking')}
            />
            <div style={{ flex: 1 }}>
              <p style={paragraphStyle}>
                Born in Hong Kong and currently based in the South of France, Shannon is a British national who immigrated to France at age 15 due to Brexit and political instability (violent protests) in Hong Kong. She left behind her family, friends, and everything familiar to pursue her dreams.
              </p>
              <p style={paragraphStyle}>
                Shannon is currently pursuing her dream of becoming a <span style={highlights.blue}>design engineer</span> and <span style={highlights.purple}>inventor</span> in the U.S. while preparing for her historic aviation expedition. She's taking several gap years to complete her journey, planning either to continue her studies in electrical engineering or scale her <span style={highlights.green}>software startup</span> in the U.S.
              </p>
              <p style={paragraphStyle}>
                Fun facts about Shannon's early milestones:
              </p>
              <ul style={{ ...paragraphStyle, paddingLeft: '1.5rem' }}>
                <li>At 10 years old, taught herself programming and hacked into her school's system</li>
                <li>At 11, teachers recognized her as a gifted artist</li>
                <li>At 15, became an electronics hobbyist and started building autonomous fixed-wing delivery drones, a computer made from logic gates entirely from scratch, frequency counters, etc.</li>
                <li>At 16, was introduced to aviation through microlight flying</li>
                <li>At 18, taught herself ML/AI and launched her software startup as a solo founder. It is currently raising a pre-seed round at a $10M post-money valuation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Adversity Section */}
        <section id="adversity" style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Overcoming Adversity</h2>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', alignItems: 'flex-start' }}>
            <img
              src="/snow.png"
              alt="Shannon Portrait"
              style={{ ...imageStyle, maxWidth: '300px' }}
              onClick={() => openModal('/snow.png', 'Shannon Portrait')}
            />
            <div style={{ flex: 1 }}>
              <p style={paragraphStyle}>
                Raised by a single father who came from modest means—working jobs like selling shoes and waiting tables before putting himself through college at 25—Shannon faced profound challenges early in life.
              </p>
              <p style={paragraphStyle}>
                At just 10 years old, she took responsibility for caring for her sick mother, preparing medication each morning, until her mother sadly passed away from <span style={highlights.purple}>breast cancer</span> that same year. The year brought even more hardship: difficulties at school, her grandmother's death from breast cancer, and her grandfather's death after falling into a coma.
              </p>
              <p style={paragraphStyle}>
                Family conflicts led to over a decade of court battles, and a tragic car accident nearly left her orphaned. Despite these overwhelming challenges, Shannon struggled in traditional schools but found early success in <span style={highlights.green}>art</span>. Her passion and curiosity ultimately led her toward <span style={highlights.orange}>science and flight</span>—defying the odds to carve her own path.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" style={sectionStyle}>
          <h2 style={sectionTitleStyle}>From Hacking to Flight</h2>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', gap: '2rem', alignItems: 'flex-start' }}>
            <img
              src="/hack.png"
              alt="Shannon Mode"
              style={{ ...imageStyle, maxWidth: '300px', height: '200px', objectFit: 'cover' }}
              onClick={() => openModal('/hack.png', 'Shannon Mode')}
            />
            <div style={{ flex: 1 }}>
              <p style={paragraphStyle}>
                At 10, Shannon taught herself <span style={highlights.red}>ethical hacking</span>. At 15, she dove deep into <span style={highlights.orange}>electronics</span>, building her own circuits and exploring how hardware and software worked. She began flying <span style={highlights.green}>microlights</span> at 16 and later trained for her private pilot license.
              </p>
              <p style={paragraphStyle}>
              In her spare time, Shannon immerses herself in a wide range of subjects — from quantum mechanics, physics, product engineering, and machine learning to history, art, and design. She enjoys philosophy, science fiction, and futuristic literature, especially books with electronic or speculative themes. A fan of both classical and punk rock music, she also codes apps, watches documentaries, and, when not indoors, seeks out adrenaline through adventure sports.

Shannon also has an eclectic set of hands-on skills and hobbies: she’s played piano since the age of eight, started tennis at seven, and has trained in Wing Chun martial arts.              </p>
              <p style={paragraphStyle}>
                To prepare for her Antarctic mission, Shannon has taken a <span style={highlights.blue}>winter survival course</span> which included pulling a 50kg sled up the Norwegian mountains in -15°C weather for 8 hours a day for 1 week (equivalent to 23 miles daily) in case her engine quits over <span style={highlights.yellow}>Antarctica</span>.
              </p>
            </div>
          </div>
        </section>

        {/* South Pole Mission */}
        <section id="south-pole" style={sectionStyle}>
          <h2 style={sectionTitleStyle}>The South Pole Mission</h2>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', alignItems: 'flex-start' }}>
            <img
              src="/s.jpg"
              alt="Shannon Fun"
              style={{ ...imageStyle, maxWidth: '300px' }}
              onClick={() => openModal('/s.jpg', 'Shannon Fun')}
            />
            <div style={{ flex: 1 }}>
              <p style={paragraphStyle}>
                In October 2026, Shannon will attempt to fly solo across all continents and land in <span style={highlights.purple}>Antarctica</span>—becoming the first woman to fly a small plane to the <span style={highlights.orange}>South Pole</span> and the first woman ever to fly solo across all <span style={highlights.green}>seven continents</span> (westbound).
              </p>
              <p style={paragraphStyle}>
                This unprecedented journey will require extraordinary preparation, including survival training, advanced navigation skills, and modifications to her aircraft to handle extreme polar conditions. The mission represents the culmination of years of preparation and training.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Why It Matters</h2>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', gap: '2rem', alignItems: 'flex-start' }}>
            <img
              src="/homer.jpg"
              alt="Shannon's Mission"
              style={{ ...imageStyle, maxWidth: '300px', height: '250px' }}
              onClick={() => openModal('/homer.jpg', "Shannon's Mission")}
            />
            <div style={{ flex: 1 }}>
              <p style={paragraphStyle}>
              This mission isn't just about records. It's about proving that no background, limitation, or obstacle should ever define us. Shannon wants to inspire <span style={highlights.purple}>youth</span>—especially <span style={highlights.orange}>girls</span>—to embrace <span style={highlights.green}>science</span>, <span style={highlights.red}>exploration</span>, and <span style={highlights.yellow}>deep self-belief</span>.

              </p>
              <p style={paragraphStyle}>
                Through her journey, Shannon aims to demonstrate that with determination, curiosity, and bold thinking, anyone can push the boundaries of what's possible and inspire others to do the same.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <a href="/journey" style={{ textDecoration: 'none' }}>
                  <button style={{
                    fontSize: '1rem',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600'
                  }}>
                    Track the Journey
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutMePage;
