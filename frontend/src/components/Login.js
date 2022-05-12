import Navbar from "./Navbar";
import Footer from "./Footer";
import '../static/css/login.css'
import { useEffect, useState} from 'react';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import logo from "../static/images/logo.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const Login = ({nickname, onLogin}) => {
    

    //  Login fields states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    if (nickname === "None"){
        return(
            <div className = "login__bg">
                <div id="login__box">
                    <div id="login__header">
                        <h1>Training World</h1>
                        <h2>Login Panel</h2>
                        <img src={logo}/>
                    </div>

                    <div id="login__fields">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                            id="email" size="large" label="Email" variant="standard"
                            onChange={(e)=> setEmail(e.target.value)}/>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="password" size="large" label="Password" variant="standard"
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                        </Box>

                        <Button id="login__button"size="large" 
                            onClick={() => onLogin(email, password)}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    else {
        return(
            <div className = "login">
                <h1>User is arleady logged in!</h1>
            </div>
        );
    }
}

export default Login;

