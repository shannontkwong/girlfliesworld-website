import React from 'react';
import Footer from '../components/layout/Footer';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Ted Scambos',
      position: 'Senior Research Scientist, University of Colorado Boulder',
      pronouns: 'he/him',
      description: 'Ted Scambos is one of the world’s leading experts in remote sensing of the cryosphere and in-situ glacier measurements. With over 19 Antarctic field expeditions and 14 years as Lead Scientist at the National Snow and Ice Data Center, he has authored 150+ peer-reviewed papers and led dozens of major research projects. As Shannon’s principal scientific advisor, he guides the mission’s climate science goals, flight paths, and data-collection strategy across Antarctica, Greenland, and other remote regions.',
      image: 'scambos.png',
      category: 'SCIENCE'
    },
    
    {
      name: 'TBD',
      position: 'TBD',
      pronouns: 'they/them',
      image: 'user.webp',
      category: 'SCIENCE'
    },
    {
      name: 'Michel Gordillo',
      position: 'Mentor / Record-Breaking Aviator',
      pronouns: 'he/him',
      image: '/gordillo.png',
      category: 'AVIATION',
      description: `Michel Gordillo is a world-record Spanish-French pilot and pioneering explorer. He was the first person to circumnavigate the globe via both the North and South Poles in an experimental aircraft under 1,750 kg. 
    He built his own Van’s RV-8 (“Sky Polaris”) with his daughters and completed a 76,400 km mission including a nonstop 4,700 km leg across Antarctica, while gathering atmospheric black-carbon data to support climate science. 
    A retired Iberia A320 captain with more than 15,000 flight hours, Michel now serves as a key mentor to Shannon—helping her navigate both the technical and existential complexities of long-distance experimental aviation.`
    },
      
    {
      name: 'Herb Baker',
      position: 'Former Manager, Operations Support & Flight Procurement – NASA JSC',
      pronouns: 'he/him',
      image: 'h.png',
      category: 'AVIATION',
      description: `Herb spent 42 years at NASA, contributing to missions from Apollo to Artemis across JSC, KSC, and NASA Headquarters. He played major roles in Shuttle Orbiter contracts, ISS and Constellation programs, and flight-operations procurement, including acquiring NASA’s Gulfstream-V for astronaut return. A recipient of the NASA Exceptional Service Medal, Herb will support the project in an important advisory and managerial capacity, guiding business operations and high-level mission planning.`
    },
    
    
    {
      name: 'Jeremy La Zelle',
      position: 'Director / Producer',
      pronouns: 'he/him',
      image: 'j.jpg',
      category: 'MEDIA',
      description: `Jeremy La Zelle is an award-winning filmmaker whose work spans National Geographic, Discovery, History Channel, Bravo, and BET. Known for impactful documentary storytelling, he creates media that bridges continents, cultures, and communities—often centered on advocacy, education, and global connection. Jeremy will be directing and filming key parts of Shannon’s journey, capturing the mission’s challenges, discoveries, and human stories for the documentary.`
    },
    
    {
      name: 'TBD',
      position: 'TBD',
      pronouns: 'they/them',
      image: 'user.webp',
      category: 'MEDIA'
    }
  ];

  const categories = ['SCIENCE', 'AVIATION', 'MEDIA'];

  const getMembersByCategory = (category) => {
    return teamMembers.filter(member => member.category === category);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '80px 40px 60px',
        textAlign: 'left',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontFamily: 'Impact, Arial Black, sans-serif',
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#000',
          margin: '0 0 30px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          MEET THE TEAM
        </h1>
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          color: '#333',
          maxWidth: '800px',
          margin: '0',
          fontWeight: '400'
        }}>
          Meet the team dedicated to supporting Shannon Wong's journey, promoting her core principles, and inspiring the community to make it a better place.
        </p>
      </div>

      {/* Team Members Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '0 40px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {categories.map((category) => (
          <div key={category} style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#000',
              margin: '0 0 40px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              {category}
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '40px',
              alignItems: 'start'
            }}>
              {getMembersByCategory(category).map((member, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}>
                  {/* Member Image */}
                  <div style={{
                    width: '150px',
                    height: '150px',
                    flexShrink: 0
                  }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  
                  {/* Member Info */}
                  <div style={{
                    flex: 1,
                    paddingTop: '10px'
                  }}>
                    <h3 style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#000',
                      margin: '0 0 8px 0',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}>
                      {member.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      margin: '0 0 8px 0',
                      fontStyle: 'italic'
                    }}>
                      {member.pronouns}
                    </p>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      fontWeight:'600',
                  
                      color: 'black',
                      fontWeight:'600',
                      textAlign: 'left',
                      marginBottom: '1.5rem'
                    }}>
                      {member.position}
                    </p>
                    <p style={{
                       fontSize: '0.875rem',
                       lineHeight: 1.6,
                       fontWeight:'500',
                   
                       color: '#374151',
                       fontWeight:'600',
                       textAlign: 'left',
                       marginBottom: '1.5rem'
                    }}>
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

 
<Footer />


    </div>
  );
};

export default TeamPage;
