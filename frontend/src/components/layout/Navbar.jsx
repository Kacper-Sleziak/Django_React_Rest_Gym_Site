import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../static/css/navbar.css';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../static/images/logo.png';
import {
  getNickname,
} from '../../store/slices/auth';

function Navbar() {
  const nickname = useSelector(getNickname);

  const renderLoginBox = () => {
    if (nickname === undefined) {
      return (
        <Link to="/login" className="link" id="login">Login</Link>
      );
    }
    return (
      <div id="login__box">
        <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
          <div id="login__click">
            <PersonIcon />
            <span>{nickname}</span>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <nav>
      <div id="navbar">
        <Link to="/" className="logo_link">
          <div className="logo__navbar">
            <img src={logo} alt="Logo" />

            <span>
              <p className="logo__navbar__text">TRAINING</p>
              <p className="logo__navbar__text">WORLD</p>
            </span>
          </div>
        </Link>

        <div id="menu_button">
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>

        <div id="side_navbar">
          <div className="nav_top">
            <div id="menu_text">
              Menu
            </div>

            <div id="close_button">
              <span>X</span>
            </div>
          </div>

          <div id="links_container">
            <a href="about_us.html">About us</a>
            <a href="classes.html">Classes</a>
            <a href="#contact_scroll">Contact</a>
            <a href="blog.html">Blog</a>
          </div>
        </div>

        <div className="links__box">
          <div className="links">
            <div className="menu_item">
              <a className="link" href="about_us.html">About us</a>
            </div>

            <div className="menu_item">
              <a className="link" href="classes.html">Classes</a>
            </div>

            <div className="menu_item">
              <a className="link" href="#contact_scroll">Contact</a>
            </div>

            <div className="menu_item">
              <Link to="/blog" className="link">Blog</Link>
            </div>
            <div className="menu_item">
              {renderLoginBox()}
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;
