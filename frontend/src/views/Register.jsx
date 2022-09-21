/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/login.css';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { getNickname } from '../store/slices/auth';

function Register() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const storeNickname = useSelector(getNickname);

  const navigate = useNavigate();

  function Auth() {
    // To Do
    // Set Response data in store
  }

  // Return authorized users to home page
  useEffect(() => {
    if (storeNickname !== undefined) {
      navigate('/');
    }
  });

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
