import React from 'react';

const SocialMediaSection = () => {
  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61554771839720',
      icon: 'https://img.icons8.com/windows/32/facebook-f--v1.png',
      alt: 'Facebook'
    },
    {
      href: 'https://www.linkedin.com/company/girlfliesworld',
      icon: 'https://img.icons8.com/ios-filled/50/linkedin.png',
      alt: 'LinkedIn'
    },
    {
      href: 'https://www.instagram.com/girlfliesworld/',
      icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg',
      alt: 'Instagram'
    },
    {
      href: 'https://x.com/girlfliesworld',
      icon: 'https://img.icons8.com/ios-filled/50/twitterx--v1.png',
      alt: 'Twitter'
    },
    {
      href: 'https://www.youtube.com/channel/UCXQmU6WEELqxfk7sMPIQXXg',
      icon: 'https://img.icons8.com/sf-black-filled/64/youtube-play.png',
      alt: 'YouTube'
    }
  ];

  const sectionStyle = {
    padding: '4rem 2rem',
    textAlign: 'center',
  };

  const linksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem'
  };

  const iconStyle = {
    width: '40px',
    height: '40px',
    opacity: 1,
    transition: 'all 0.3s ease',
  };

  return (
    <section style={sectionStyle}>
      <h3>Follow the Journey</h3>
      <div style={linksStyle}>
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            <img 
              style={iconStyle} 
              src={link.icon} 
              alt={link.alt}
              onMouseOver={(e) => {
                e.target.style.opacity = 1;
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.target.style.opacity = 1;
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaSection;
