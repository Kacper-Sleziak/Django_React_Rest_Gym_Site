import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import HomePage from './views/HomePage';
import Profile from './views/Profile';
import Blog from './views/Blog';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './views/Login';
import Register from './views/Register';
import './static/css/global.css';

function GlobalRouter() {
  return (
    <div id="root_container">
      <div id="main_bg">
        <Router>
          <Navbar />
          <Routes>
            {/* public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            {/* onnly for unauthorized users */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default GlobalRouter;
