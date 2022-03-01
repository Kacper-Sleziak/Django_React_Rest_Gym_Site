import Navbar from "./Navbar";
import Footer from "./Footer";
import '../static/css/login.css'
import { useEffect, useState} from 'react';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const Login = ({userNickname, userEmail, userToken}) => {

    //  User information states 
    const [nickname, setNickname] = useState(userNickname)
    const [email, setEmail] = useState(userEmail)
    const [token, setToken] = useState(userToken)
    
    //  Login fields states
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    // Setting User data states after fetch
    const setUserData = (nickname, email, token) =>{
        setNickname(nickname)
        setEmail(email)
        setToken(token)

        console.log(email)
        console.log(nickname)
        console.log(token)
    }

    // Making fetch to end point 
    const handleLoginButton = () =>{

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: username,
                password: password 
            })
        }

        fetch('http://127.0.0.1:8000/api/account/login', requestOptions)
        .then(response => response.json())
        .then(data => setUserData(
             data["nickname"],
             data["email"],
             data["token"]
        ))
    }

    if (nickname === "None"){
        return(
            <div className = "login">
                <div id="login__fields">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                        id="email" size="large" label="Email" variant="standard"
                        onChange={(e)=> setUsername(e.target.value)}/>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="password" size="large" label="Password" variant="standard"
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    </Box>

                    <Button id="login__button"size="large" onClick={handleLoginButton}>Login</Button>
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

