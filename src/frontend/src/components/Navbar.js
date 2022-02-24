import React from "react";

const Navbar = () => {
    return(
        <nav>
            <div id="navbar">
                <a className="logo_link" href="index.html">
                    <div className="logo__navbar">
                        <img src="././static/images/logo.png" alt="Logo"/>

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
                    </div>

                    <div className = "navbar__icons">
                        <a id ="fb" href=""><img src ="././static/images/fb.png" alt="Facebook link"/></a>
                        <a id ="ig" href=""><img src ="././static/images/ig.png" alt="Instagram link"/></a>
                        <a id ="tw" href=""><img src ="././static/images/tw.png" alt="Twitter link"/></a>
                    </div>        
                </div>       
            </div>

    </nav>
    );
}

export default Navbar