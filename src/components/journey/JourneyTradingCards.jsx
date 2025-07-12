import React from 'react';
import { Flame, Mountain, Compass, Waves, Snowflake, Globe2, Landmark, Plane, TreePine, TreePalm, Sun } from 'lucide-react';

const JourneyTradingCards = () => {
  const journeyCards = [
    {
      id: 1,
      title: 'The Island Hopper',
      subtitle: 'Dragons to Samurai Skies',
      description: 'Hong Kong - Thailand - India - UAE',
      icon: <TreePalm size={28} />,
      difficulty: 6,
      danger: 45,
      power: 7,
      skill: 8,
      endurance: 7,
      wildness: 6,
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      borderColor: '#FF6B6B',
      image: 'dragon.png' // Replace with actual image
    },
    {
      id: 2,
      title: 'The Pharaoh\'s Ascent',
      subtitle: 'Pyramids to Palaces',
      description: 'Egypt - Italy - France - United Kingdom',
      icon: <Landmark size={28} />,
      difficulty: 5,
      danger: 30,
      power: 6,
      skill: 7,
      endurance: 6,
      wildness: 4,
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFE66D 100%)',
      borderColor: '#FFD93D',
      image: '/py.png'
    },
   
    {
      id: 3,
      title: 'The Great Atlantic',
      subtitle: 'Crossing the Void',
      description: 'United Kingdom - Iceland - Greenland - Canada',
      icon: <Snowflake size={28} />,
      difficulty: 9,
      danger: 75,
      power: 8,
      skill: 10,
      endurance: 9,
      wildness: 8,
      gradient: 'linear-gradient(135deg, #A8E6CF 0%, #C8E6C9 100%)',
      borderColor: '#A8E6CF',
      image: 'at.png'
    },
    {
      id: 4,
      title: 'The Rebel Coast',
      subtitle: 'Heat, Rhythm & Hurricanes',
      description: 'USA - Mexico - Bahamas - Costa Rica',
      icon: <Sun size={28} />,
      difficulty: 7,
      danger: 55,
      power: 8,
      skill: 7,
      endurance: 8,
      wildness: 8,
      gradient: 'linear-gradient(135deg, #FFB74D 0%, #FFC947 100%)',
      borderColor: '#FFB74D',
      image: '/dry.png'
    },
    {
      id: 5,
      title: 'The Jungle Gauntlet',
      subtitle: 'Through Amazon\'s Breath',
      description: 'Colombia - Brazil - Uruguay - Argentina',
      icon: <TreePine size={28} />,
      difficulty: 8,
      danger: 70,
      power: 7,
      skill: 8,
      endurance: 9,
      wildness: 10,
      gradient: 'linear-gradient(135deg, #81C784 0%, #A5D6A7 100%)',
      borderColor: '#81C784',
      image: '/jungle.png'
    },
    {
      id: 6,
      title: 'Edge of the World',
      subtitle: 'Into Drake\'s Wrath',
      description: 'Ushuaia - Marsh Base',
      icon: <Compass size={28} />,
      difficulty: 10,
      danger: 98,
      power: 9,
      skill: 10,
      endurance: 10,
      wildness: 10,
      gradient: 'linear-gradient(135deg, #64B5F6 0%, #90CAF9 100%)',
      borderColor: '#64B5F6',
      image: '/drake.png'
    },
    {
      id: 7,
      title: 'Frostbite Mania',
      subtitle: 'Chasing Shadows to Pole',
      description: 'Marsh - South Pole',
      icon: <Snowflake size={28} />,
      difficulty: 10,
      danger: 100,
      power: 10,
      skill: 10,
      endurance: 10,
      wildness: 9,
      gradient: 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)',
      borderColor: '#E1F5FE',
      image: '/ice.webp'
    },
    {
      id: 8,
      title: 'White Silence',
      subtitle: 'The Endless West',
      description: 'South Pole Station - Mario Zuchelli',
      icon: <Globe2 size={28} />,
      difficulty: 10,
      danger: 100,
      power: 10,
      skill: 10,
      endurance: 10,
      wildness: 10,
      gradient: 'linear-gradient(135deg, #F8BBD9 0%, #FADDE1 100%)',
      borderColor: '#F8BBD9',
      image: '/west.png'
    },
    {
      id: 9,
      title: 'Sea of Sins',
      subtitle: 'World\'s Most Treacherous Ocean',
      description: 'New Zealand - Australia',
      icon: <Waves size={28} />,
      difficulty: 8,
      danger: 80,
      power: 8,
      skill: 9,
      endurance: 10,
      wildness: 9,
      gradient: 'linear-gradient(135deg, #80DEEA 0%, #B2EBF2 100%)',
      borderColor: '#80DEEA',
      image: '/shark.png'
    },
    {
      id: 10,
      title: 'Equator\'s Crown',
      subtitle: 'The Steam Belt Return',
      description: 'Indonesia - Malaysia - Singapore - Thailand - Vietnam - Hong Kong',
      icon: <Flame size={28} />,
      difficulty: 7,
      danger: 60,
      power: 8,
      skill: 8,
      endurance: 9,
      wildness: 7,
      gradient: 'linear-gradient(135deg, #FFAB91 0%, #FFCC80 100%)',
      borderColor: '#FFAB91',
      image: '/steam.png'
    }
  ];

  const StatBar = ({ label, value, maxValue = 10, color }) => (
    <div className="stat-item">
      <div className="stat-label">{label}</div>
      <div className="stat-bar-container">
        <div 
          className="stat-bar-fill" 
          style={{ 
            width: `${(value / maxValue) * 100}%`,
            backgroundColor: color
          }}
        />
      </div>
      <div className="stat-value">{value}{maxValue === 100 ? '%' : ''}</div>
    </div>
  );

  return (
    <div className="trading-cards-container">
      {journeyCards.map((card) => (
        <div key={card.id} className="trading-card" style={{ '--border-color': card.borderColor }}>
          {/* Card Header */}
          <div className="card-header-section" style={{ background: card.gradient }}>
            <div className="card-number">#{card.id.toString().padStart(2, '0')}</div>
            <div className="card-icon">{card.icon}</div>
          </div>

          {/* Card Image */}
          <div className="card-image-section">
            <img 
              src={card.image} 
              alt={card.title}
              className="card-image"
            />
          </div>

          {/* Card Content */}
          <div className="card-content-section">
            <div className="card-title-area">
              <h3 className="card-main-title">{card.title}</h3>
              <p className="card-subtitle">{card.subtitle}</p>
              <p className="card-description">{card.description}</p>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stats-grid">
                <StatBar label="Difficulty" value={card.difficulty} color={card.borderColor} />
                <StatBar label="Danger" value={card.danger} maxValue={100} color={card.borderColor} />
                <StatBar label="Power" value={card.power} color={card.borderColor} />
                <StatBar label="Skill" value={card.skill} color={card.borderColor} />
                <StatBar label="Endurance" value={card.endurance} color={card.borderColor} />
                <StatBar label="Wildness" value={card.wildness} color={card.borderColor} />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="card-logo">
            <div className="logo-placeholder">GFW</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JourneyTradingCards;

// Add this CSS to your component or as a separate CSS file
const styles = `
.trading-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.trading-card {
  position: relative;
  width: 320px;
  height: 530px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 3px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.trading-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

.card-header-section {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
}

.card-number {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.card-icon {
  color: #ffffff;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
}

.card-image-section {
  height: 140px;
  overflow: hidden;
  position: relative;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.trading-card:hover .card-image {
  transform: scale(1.05);
}

.card-content-section {
  padding: 20px;
  height: calc(100% - 190px);
  display: flex;
  flex-direction: column;
}

.card-title-area {
  margin-bottom: 20px;
}

.card-main-title {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.card-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #e74c3c;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.card-description {
  font-size: 12px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.3;
}

.stats-section {
  flex-grow: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #34495e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-bar-container {
  width: 100%;
  height: 6px;
  background-color: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
}

.stat-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.stat-value {
  font-size: 12px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
}

.card-logo {
  position: absolute;
  bottom: 12px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fe019a;
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.logo-placeholder {
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .trading-cards-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  
  .trading-card {
    width: 100%;
    max-width: 320px;
    justify-self: center;
  }
}

/* Card rarity effects */
.trading-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--border-color), transparent, var(--border-color));
  z-index: -1;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trading-card:hover::before {
  opacity: 0.3;
}

/* Special holographic effect for high-difficulty cards */
.trading-card[data-difficulty="10"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trading-card[data-difficulty="10"]:hover::after {
  opacity: 1;
  animation: holographic 2s infinite;
}

@keyframes holographic {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
