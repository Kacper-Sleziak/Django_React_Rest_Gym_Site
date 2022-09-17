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
import useAxiosFunction from '../api/hooks/useAxiosFunction';
import axios_instance from '../api/api_main_config'
import { useSelector, useDispatch } from 'react-redux'
import { getNickname, setStoreNickname, setStoreToken, setStoreEmail } from "../store/slices/auth"
import { ContactsOutlined } from '@material-ui/icons';


const Login = () => {
    
    //  Login fields states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [response, error, loading, axiosFetch] = useAxiosFunction();
    
    const dispatch = useDispatch()
    const nickname = useSelector(getNickname)

    const login = () => { 
        axiosFetch({
            axiosInstance: axios_instance,
            method: 'POST',
            url: '/account/login',
            requestConfig:{
                email: email,
                password: password,
            }
        })
        setEmail("")
        setPassword("")
    }

    // Handling saving data in store
    useEffect(() => {
        if (response) {
            dispatch(setStoreNickname(response['nickname']))
        }
        if (error) {
        }
    }, [loading])

    useEffect(() => {
    }, [nickname])

    if (nickname !== undefined){
        return(
            <div className = "login">
                <h1>{nickname} you are arleady logged in!</h1>
            </div>
        );
    } else {
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
                            onChange={e => setEmail(e.target.value)}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="password" size="large" label="Password" variant="standard"
                            onChange={e => setPassword(e.target.value)}
                            />
                        </Box>

                        <Button id="login__button"size="large" onClick={login}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

