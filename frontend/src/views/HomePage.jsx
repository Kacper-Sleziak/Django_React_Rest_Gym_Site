/* eslint-disable react/button-has-type */
import React from 'react';
import '../static/css/index.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function HomePage() {
  return (
    <div id="home_container">
      <header>
        <div className="header__text">
          <span className="main__text">
            FITNESS IS NOT
            <br />
          </span>

          <span className="near__main__text">
            ABOUT BEING BETTER
            <br />
            THAN SOMEONE ELSE...IT IS ABOUT
            <br />
            BEING BETTER THAN YOU USED TO BE
          </span>
        </div>

        <div className="header__join__us">
          <br />
          <button>
            JOIN US
          </button>
        </div>
      </header>

      <div id="media">
        <div id="icons">
          <div className="icon" id="fb">
            <FacebookIcon
              fontSize="medium"
            />
          </div>

          <div className="icon">
            <InstagramIcon
              fontSize="medium"
            />
          </div>

          <div className="icon">
            <TwitterIcon
              fontSize="medium"
            />
          </div>
        </div>
        <div id="media_text">
          <span>Follow us</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
