import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Page components
import AboutMePage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';
import JourneyPage from './pages/JourneyPage';
import TeamPage from './pages/TeamPage';
import PlanePage from './pages/PlanePage';
import PartnersPage from './pages/PartnersPage';

// Layout components
import Navigation from './components/layout/Navigation';
import LoadingScreen from './components/layout/LoadingScreen';
import HomePage from './pages/HomePage';
import NewsVideosPage from './pages/NewsVideosPage';
import VideosPage from './pages/VideosPage';
import Blog from './pages/BlogPage';

function App() {
  return (
    <Router>
      <div className="App">
        <LoadingScreen />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutme" element={<AboutMePage />} />
          <Route path="/news" element={<NewsVideosPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/plane" element={<PlanePage />} />
          <Route path="/partners" element={<PartnersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
