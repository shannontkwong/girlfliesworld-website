import React from 'react';
import FlightSchedule from '../components/journey/FlightSchedule';
import Footer from '../components/layout/Footer';
import JourneyTradingCards from '../components/journey/JourneyTradingCards'; // You'll need to create this component
import './JourneyPage.css';

const JourneyPage = () => {
  return (
    <>
      <div className="journey-page">
        <div className="route-section">
          

          <img src="route.png" alt="Flight Route Map" className="route-map" />
          <p className="route-description">
            My goal is to fly around the world solo, which includes flying across the entire Antarctic continent, unassisted. I have chosen a route that crosses all 7 continents, large oceans, as well as the entirety of the Antarctic continent – a route that has rarely been successful before in a small plane. The entire journey will be a mix of adventures as well as unique challenges.
          <br></br>  <br></br>          To qualify for the GWR, I must land or overfly the South Pole successfully and touch all continents.

          </p>
         
        
          <FlightSchedule />
          
          <h2 className="journey-section-title">Journey Trading Cards Collection</h2>
          <p className="cards-intro">
            Each part of the journey has been turned into a collectible trading card with unique stats and difficulty ratings. Collect them all!
          </p>
          
          {/* Replace the old grid with trading cards */}
          <JourneyTradingCards />
        </div>
      </div>

      {/* Footer moved outside to full width */}
      <Footer />
    </>
  );
};

export default JourneyPage;
