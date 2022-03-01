import React from "react";
import '../static/css/footer.css'
const Footer = () => {
    return(
        <footer>
            <div class="footer_section" id="contact_scroll">
                    <div class="left_footer">
                        <div class="conntact">
                            <h1>Conntact</h1>
                            <br/>
                            Street: Street 21/5<br/>
                            City: New York<br/>
                            Zip Code: 999999<br/>
                            Phone Number: 123-456-789
                        </div>

                        <div class="menu">
                            <h1>Menu</h1>                            
                            <br/>
                            <a href="#navbar">Top of website</a> <br/>
                            <a href="about_us.html">About us</a> <br/>
                            <a href="classes.html">Classes</a> <br/>
                            <a href="blog.html"> Blog</a>
                        </div>
                    </div>
                    
                    <div class="newsletter">
                        <h1>Newsletter</h1>
                        
                        <br/>
                        
                        <button type="submit">Sign up</button>
                        <br/><br/> 
                        <span>Lorem ipsum dolor sit amet <br/>
                            consectetulla dicta quam fugit nihil.</span>
                    </div>
                </div>

                <div class="footer_2">
                    <div class="author">
                        <span>@2021 Website written by Kacper Śleziak</span>                   
                    </div>
                </div>
        </footer>
    );
}

export default Footer;
