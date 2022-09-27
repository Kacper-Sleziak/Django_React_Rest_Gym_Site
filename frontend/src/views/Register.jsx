/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
  getNickname,
  setStoreNickname,
  setStoreEmail,
  setStoreToken,
  changeAuth,
  isAuth,
} from '../store/slices/auth';

function Register() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [response, statusCode, error, loading, axiosFetch] = useAxiosFunction();
  const storeNickname = useSelector(getNickname);
  const isStoreAuth = useSelector(isAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = () => {
    axiosFetch({
      axiosInstance,
      method: 'POST',
      url: '/account/register',
      requestConfig: {
        email,
        nickname,
        password,
        password2,
      },
    });
    setPassword('');
    setPassword2('');
  };

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStoreNickname(response.nickname));
      dispatch(setStoreEmail(response.email));
      dispatch(setStoreToken(response.token));
      dispatch(changeAuth());
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
          minHeight: '310px',
        }}
        >
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="email"
              size="large"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              size="large"
              label="Nickname"
              variant="standard"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              size="large"
              label="Password"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="password"
              size="large"
              label="Repeat Password"
              type="password"
              variant="standard"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
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
              size="large"
              variant="contained"
              color="success"
              onClick={(register)}
            >
              Register
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default Register;
