import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Menu from './menu/Menu';
import Hero from './hero/Hero'; 
import Homepage from './homepage/Homepage';
import Footer from './footer/Footer';
import AboutPage from './aboutpage/AboutPage';
import LoginPage from './loginpage/LoginPage';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className='mainContainer'>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
