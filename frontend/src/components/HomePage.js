import React from "react";
import { useEffect, useState} from 'react';
import '../static/css/index.css'
import Navbar from "./Navbar";
import Footer from "./Footer";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { red } from "@mui/material/colors";

const HomePage = () => {

     
    return(
        <div>
            <div id="main_bg">
                <Navbar userNickname={"None"}/>
                <header>
                    <div className="header__text">         
                        <span className="main__text">
                            FITNESS IS NOT<br/>
                        </span>
                        
                        <span className="near__main__text">
                            ABOUT BEING BETTER<br/>
                            THAN SOMEONE ELSE...IT'S ABOUT<br/>
                            BEING BETTER THAN YOU USED TO BE
                        </span>
                    </div>
                    
                    <div className="header__join__us">
                        <br/>
                        <button>
                            JOIN US
                        </button>
                    </div>       
                </header>
            </div>

            <div id="media">
                <div id="icons">
                    <div class="icon" id="fb">
                        <FacebookIcon
                        fontSize="medium"
                        />
                    </div>

                    <div class="icon">
                        <InstagramIcon
                        fontSize="medium"
                        />
                    </div>

                    <div class="icon">
                        <TwitterIcon
                        fontSize="medium"
                        />
                    </div>
                </div>
                <div id="media_text">
                    <span>Follow us</span>
                </div>
            </div>
            
            <main>
                <div id="trainers_section">

                </div>

                <div id="schedule_section">
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage