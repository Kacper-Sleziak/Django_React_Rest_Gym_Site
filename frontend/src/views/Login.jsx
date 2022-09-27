import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../static/css/login.css';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosFunction from '../hooks/useAxiosFunction';
import axiosInstance from '../api/api_main_config';
import {
  setStoreNickname,
  setStoreEmail,
  setStoreToken,
  changeAuth,
  isAuth,
} from '../store/slices/auth';

function Login() {
  //  Login fields states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [response, statusCode, error, loading, axiosFetch] = useAxiosFunction();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isStoreAuth = useSelector(isAuth);

  const login = () => {
    axiosFetch({
      axiosInstance,
      method: 'POST',
      url: '/account/login',
      requestConfig: {
        email,
        password,
      },
    });
    setEmail('');
    setPassword('');
  };

  const register = () => {
    navigate('/register');
  };

  // Handling saving data in store
  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStoreNickname(response.nickname));
      dispatch(setStoreEmail(response.email));
      dispatch(setStoreToken(response.token));
      dispatch(changeAuth());
      navigate('/');
    }
    if (error) {
      // console.log(error)
    }
  }, [loading]);

  if (isStoreAuth) {
    return (<Navigate to="/" />);
  }
  return (
    <div className="auth_bg">
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card style={{
          background: '#fff',
          maxWidth: '500px',
          minHeight: '235px',
        }}
        >
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="email"
              size="large"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle
                      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="password"
              size="large"
              label="Password"
              type="password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityIcon
                      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            style={{ marginTop: '5px' }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{ marginBottom: '15px' }}
              onClick={login}
            >
              Login
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={register}
              color="success"
            >
              Create Account
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default Login;
