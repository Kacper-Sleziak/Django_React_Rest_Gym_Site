import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = () => {
    return(
        <div id="home_page">
                <Navbar/>
                <header>
                    <div class="header__text">         
                        <span class="main__text">
                            FITNESS IS NOT<br/>
                        </span>
                        
                        <span class="near__main__text">
                            ABOUT BEING BETTER<br/>
                            THAN SOMEONE ELSE...IT'S ABOUT<br/>
                            BEING BETTER THAN YOU USED TO BE
                        </span>
                    </div>
                    
                    <div class="header__join__us">
                        <br/>
                        <button>
                            JOIN US
                        </button>
                    </div>       
                </header>

            
            <main>
                <div class="information_section">
                    <div class="header_box">
                        <span>
                            What We Can <br/>
                            Offer?
                        </span>
                    </div>
                    
                    <div id="information_main_box">
                        <div class="graphic_info_box">
                            <img src="././static/images/strength.png"/>
                            <h1>
                                Personal Trainer <br/>
                                Help
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>                         
                        
                        <div class="graphic_info_box">
                            <img src="././static/images/nutrition.png"/>
                            <h1>Creating Nutrition
                                <br/> Plan
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>
                        
                        <div class="graphic_info_box">
                            <img src="././static/images/waga.png"/>
                            <h1>
                                Checking Body<br/>
                                Composition
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>
                        <div class="graphic_info_box">
                            <img src="././static/images/weight.png"/>
                            <h1>
                                Group <br/>
                                Activities
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>                         
                        
                        <div class="graphic_info_box">
                            <img src="././static/images/treadmill.png"/>
                            <h1>Modern
                                <br/> Equipment
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>
                        
                        <div class="graphic_info_box">
                            <img src="././static/images/award.png"/>
                            <h1>
                                Gym Bag<br/>
                                for Free
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage