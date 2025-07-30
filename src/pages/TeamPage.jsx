import React from 'react';
import Footer from '../components/layout/Footer';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Ted Scambos',
      position: 'Senior Research Scientist, University of Colorado',
      pronouns: 'he/him',
      description: 'Ted - a renowned scientist in the science world, is responsible for guiding Shannon through the scientific aspects of the airborne expedition over Antarctica, Greenland and remote areas around the world.',

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
      position: 'The best mentor ever',
      pronouns: 'he/him',
      description: 'Michel is a world-record Spanish pilot and the first person to circumnavigate the globe via the poles in an experimental aircraft weighing under 1750 kilograms. He also remains the only pilot to have flown across Antarctica in a small experimental plane (RV-8). Since meeting Shannon, he’s been an invaluable mentor — patiently guiding her through every complex (and sometimes relentless) question she throws his way',
      image: '/gordillo.png',
      category: 'AVIATION'
    },
    {
      name: 'TBD',
      position: 'TBD',
      pronouns: 'they/them',
      image: 'user.webp',
      category: 'AVIATION'
    },
    {
      name: 'TBD',
      position: 'TBD',
      pronouns: 'they/them',
      image: 'user.webp',
      category: 'MEDIA'
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
