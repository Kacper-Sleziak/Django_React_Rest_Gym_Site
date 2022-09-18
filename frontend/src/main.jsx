import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import HomePage from './views/HomePage';
import Profile from './views/Profile';
import Blog from './views/Blog';
import Navbar from './components/assets/Navbar';
import Footer from './components/assets/Footer';
import Login from './views/Login';
import './static/css/global.css';

function Main() {
  return (
    <div id="root_container">
      <div id="main_bg">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
