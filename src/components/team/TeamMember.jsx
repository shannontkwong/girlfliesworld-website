import React from 'react';
import './TeamMember.css';

const TeamMember = ({ name, position, image, socialLinks }) => {
  return (
    <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
      <p className="text-blk name">{name}</p>
      <p className="text-blk position">{position}</p>
      <img className="team-member-image" src={image} alt="Team Member" />
      <div className="social-icons">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            <img className="social-media-icon" src={link.icon} alt={link.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
