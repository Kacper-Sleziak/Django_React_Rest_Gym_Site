import React from "react";
import { useEffect, useState} from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../static/css/index.css'

import strength from "../static/images/strength.png"
import nutrition from "../static/images/nutrition.png"
import waga from "../static/images/waga.png"
import weight from "../static/images/weight.png"
import treadmill from "../static/images/treadmill.png"
import award from "../static/images/award.png"

const HomePage = ({userNickname, userEmail, userToken}) => {

    const [nickname, setNickname] = useState(userNickname)
    const [email, setEmail] = useState(userEmail)
    const [token, setToken] = useState(userToken)

    console.log(nickname)
     
    return(
        <div id="home_page">
                <Navbar userNickname={nickname}/>
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
                            <img src={strength}/>
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
                            <img src={nutrition}/>
                            <h1>Creating Nutrition
                                <br/> Plan
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>
                        
                        <div class="graphic_info_box">
                            <img src={waga}/>
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
                            <img src={weight}/>
                            <h1>
                                Group <br/>
                                Activities
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugitasdas
                            </span>   
                        </div>                         
                        
                        <div class="graphic_info_box">
                            <img src={treadmill}/>
                            <h1>Modern
                                <br/> Equipment
                            </h1>
                            <span>
                                Lorem ipsum dolor sit amet consectetur <br/>
                                adipisicing elit. Quos sunt sint fugit
                            </span>   
                        </div>
                        
                        <div class="graphic_info_box">
                            <img src={award}/>
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