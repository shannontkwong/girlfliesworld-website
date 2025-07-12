import React from 'react';
import './JourneyParts.css';

const JourneyParts = () => {
  const journeyParts = [
    {
      title: 'Part 1 - Departing Hong Kong East to cross the Pacific Ocean',
      description: 'Hong Kong - Taiwan - Japan - Pacific Islands'
    },
    {
      title: 'Part 2 - Alaska down South to Central America',
      description: 'Alaska - Canada - California - Mexico - Costa Rica'
    },
    {
      title: 'Part 3 - Crossing South America and the Amazon Forest',
      description: 'Colombia - Brazil - Uruguay - Argentina'
    },
    {
      title: 'Part 4 - Crossing the Drake\'s Passage to Antarctica',
      description: 'Ushuaia - Antarctic Peninsula'
    },
    {
      title: 'Part 5 - Reaching the South Pole',
      description: 'Antarctic Peninsula - Union Glacier - South Pole Station'
    },
    {
      title: 'Part 6 - Crossing the entire Antarctic Continent heading West',
      description: 'South Pole Station - Mario Zuchelli'
    },
    {
      title: 'Part 7 - Crossing the Southern Ocean of "Furious Fifties" and "Shrieking Sixties"',
      description: 'Mario Zuchelli - New Zealand - Australia'
    },
    {
      title: 'Part 8 - Crossing South East Asia',
      description: 'Indonesia - Malaysia - Singapore - Thailand - Vietnam - Hong Kong'
    }
  ];

  return (
    <div className="journey-parts-container">
      {journeyParts.map((part, index) => (
        <div key={index} className="square-section">
          <p><strong>{part.title}</strong></p>
          <br />
          <p>{part.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JourneyParts;
