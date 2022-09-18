/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import '../static/css/login.css';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import logo from '../static/images/logo.png';
import useAxiosFunction from '../api/hooks/useAxiosFunction';
import axiosInstance from '../api/api_main_config';
import {
  getNickname, setStoreNickname, setStoreEmail, setStoreToken,
} from '../store/slices/auth';

function Login() {
  //  Login fields states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const dispatch = useDispatch();
  const nickname = useSelector(getNickname);

  // eslint-disable-next-line no-unused-vars
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

  // Handling saving data in store
  useEffect(() => {
    // Do action only if user is not logged in
    if (nickname === undefined) {
      if (response) {
        dispatch(setStoreNickname(response.nickname));
        dispatch(setStoreEmail(response.email));
        dispatch(setStoreToken(response.token));
      }
      if (error) {
      // console.log(error)
      }
    }
  }, [loading]);

  useEffect(() => {
  }, [nickname]);

  if (nickname !== undefined) {
    return (
      <div className="login">
        <h1>
          {nickname}
          {' '}
          you are arleady logged in!
        </h1>
      </div>
    );
  }
  return (
    <div className="login__bg">
      <Box sx={{ flexGrow: 1 }} style={{ padding: '0 250px 0 250px' }}>
        <Grid container spacing={1}>
          <Grid xs={4} style={{ marginTop: '100px' }}>
            {' '}
            <div id="login__header">
              <h1>Training World</h1>
              <h2>Login Panel</h2>
              <img src={logo} alt="logo" />
              <br />
              <br />
              <span>
                To use this website with all
                <br />
                futures you have to been logged in
              </span>
            </div>
          </Grid>
          <Grid xs={3} style={{ marginTop: '100px' }}>
            <Card style={{ background: '#4D6579' }}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="email"
                  size="large"
                  label="Email"
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    </InputAdornment>,
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="email"
                  size="large"
                  label="Email"
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    </InputAdornment>,
                  }}
                />
              </FormControl>

              <Button id="login__button" size="large" onClick={login}>
                Login
              </Button>
              <Button id="login__button" size="large" onClick={login}>
                Register
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
