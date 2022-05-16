import React from "react";
import { useEffect, useState} from 'react';
import '../static/css/index.css'
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = ({userNickname, userEmail, userToken}) => {

    const [nickname, setNickname] = useState(userNickname)
    const [email, setEmail] = useState(userEmail)
    const [token, setToken] = useState(userToken)

    console.log(nickname)
     
    return(
        <div>
            <div id="main_bg">
                <Navbar userNickname={nickname}/>
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