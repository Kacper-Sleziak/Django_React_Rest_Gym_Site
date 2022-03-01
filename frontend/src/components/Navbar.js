import React from "react";
import { useEffect, useState} from 'react';

import '../static/css/navbar.css'
import logo from "../static/images/logo.png"
import fb from "../static/images/fb.png"
import ig from "../static/images/ig.png"
import tw from "../static/images/tw.png"
import PersonIcon from '@mui/icons-material/Person';

const Navbar = ({userNickname}) => {
    
    const [nickname, setNickname] = useState(userNickname)

    const renderLogin = () => {

        console.log(nickname)

        if (nickname === "None"){
            return(
                <a className="link" id="login" href="blog.html">Login</a>
            );
        }
    }

    const renderLoginBox = () => {
        if (nickname != "None"){  
            return(
                <div id="login__box">
                    <a>
                        <div id="login__click">
                            <PersonIcon />
                            <span>{nickname}</span>
                        </div>
                    </a>
                    <span id="logout">Logout</span>
                </div>  
            );
        }
    }
    
    return(
        <nav>
            <div id="navbar">
                <a className="logo_link" href="index.html">
                    <div className="logo__navbar">
                        <img src={logo} alt="Logo"/>

                        <span>
                            <p className="logo__navbar__text">TRAINING</p>
                            <p className="logo__navbar__text">WORLD</p>
                        </span>
                    </div>
                </a>
                
                <div id="menu_button">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <div id="side_navbar">
                    <div className="nav_top">
                        <div id = "menu_text">
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

                <div className ="links__box">
                    <div className="links">
                        <a className="link" id="about_us" href="about_us.html">About us</a>
                        <a className="link" id="classes" href="classes.html">Classes</a>
                        <a className="link" id="contact" href="#contact_scroll">Contact</a>
                        <a className="link" id="blog" href="blog.html">Blog</a>
                        {renderLogin()}
                    </div>

                    <div className = "navbar__icons">
                        <a id ="fb" href=""><img src ={fb} alt="Facebook link"/></a>
                        <a id ="ig" href=""><img src ={ig} alt="Instagram link"/></a>
                        <a id ="tw" href=""><img src ={tw} alt="Twitter link"/></a>
                    </div> 

                    {renderLoginBox()}
                </div>       
            </div>

    </nav>
    );
}

export default Navbar