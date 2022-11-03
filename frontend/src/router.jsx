import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import HomePage from './views/HomePage';
import Profile from './views/Profile';
import Article from './views/Article'
import Blog from './views/Blog';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './views/Login';
import Register from './views/Register';
import PageNotFound from './views/PageNotFound';
import './static/css/global.css';

function GlobalRouter() {
  return (
    <div id="root_container">
      <Router>
        <Navbar />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/:slug" element={<Article />} />

          {/* onnly for unauthorized users */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default GlobalRouter;