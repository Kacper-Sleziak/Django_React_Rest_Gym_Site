import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getNickname, setStoreNickname, setStoreEmail, setStoreToken, changeAuth
} from '../store/slices/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axiosInstance from '../api/api_main_config';
import useAxios from '../hooks/useAxios';
import Avatar from '@mui/material/Avatar';
import BlogHeaders from '../components/profile/BlogHeaders';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../static/css/profile.css';

function Profile() {
  const dispatch = useDispatch();
  const nickname = useSelector(getNickname);
  const navigate = useNavigate();
  const serverIp = "http://127.0.0.1:8000/"

  // articles api handler
  const [response, error, loading, refetch] = useAxios({
    axiosInstance: axiosInstance,
    method: 'GET',
    url: `/user_profile/${nickname}`,
  });

  const [tag, setTag] = useState('SPORT');
  const [title, setTitle] = useState('Title')
  const [body, setBody] = useState('')
  const [short, setShort] = useState('')
  
  const tags = [
    {
      value: 'SPORT',
      label: 'SPORT',
    },
    {
      value: 'HEALTH',
      label: 'HEALTH',
    },
  ]

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

    // logout handler 
    const logOut = () => {
      dispatch(setStoreNickname(undefined));
      dispatch(setStoreEmail(undefined));
      dispatch(setStoreToken(undefined));
      dispatch(changeAuth());
      navigate('/login');
    };

    const add_new_post = () => {
      console.log(tag)      
    }

  if (nickname === undefined) {
    return <h1>You have to be logged in to see profile!</h1>;
  }
  if (response.data !== undefined){
    return (
      <Grid 
      sx={{width:'100%', minHeight:600, padding:"100px 100px 100px 100px"}}
      container spacing={2}
      >
      <Grid item xs={2}
      >
        <Avatar 
        sx={{width: 200, height: 200}}
        alt="User"
        src={serverIp + response.data.avatar} 
      />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="h4"
          sx={{marginRight: 'auto', marginBottom: 2}}
        >
          {response.data.nickname}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{marginRight: 'auto'}}
        >
          {"first name " + response.data.first_name}
        </Typography>  
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{marginRight: 'auto'}}
        >
          {"last name  " + response.data.last_name}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{marginRight: 'auto'}}
        >
          {"email " + response.data.email}
        </Typography>        
      </Grid>
      
      <Grid item xs={4}>
        <Box
        >
          <Button
          onClick={logOut}
          variant="contained"
          color="success"
          sx={{marginLeft: '200px'}}
          >
            logout
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
        sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}
        >
            <Typography
            variant="h2"
            sx={{marginBottom:2}}
            >
              Your Posts
            </Typography>
            <BlogHeaders nickname={nickname}/>

            <Typography
            variant="h2"
            sx={{marginTop:2, marginBottom: 3}}
            >
              Create New Post
            </Typography>
            <Box
            sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}
            >
              <TextField
                sx={{marginBottom:3}}
                required
                id="outlined-required"
                label="Title"
                defaultValue="Post title"
                helperText="Please set title of your post"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
              sx={{marginBottom:3}}
              id="outlined-select-currency"
              select
              required
              label="Tag"
              onChange={handleTagChange}
              value={tag}
              helperText="Please select tag of your post"
              >
              {tags.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>

              <TextField
                sx={{marginBottom:3}}
                id="outlined-multiline-static"
                label="Short of post"
                multiline
                rows={3}
                defaultValue="Short"
                onChange={(e) => setShort(e.target.value)}
              />
              <TextField
                sx={{marginBottom:3}}
                id="outlined-multiline-static"
                label="Body of post"
                multiline
                rows={3}
                defaultValue="Body"
                onChange={(e) => setBody(e.target.value)}
              />

          <Button
            onClick={add_new_post}
            variant="contained"
            color="success"
          >
            Add new blog post
          </Button>
          </Box>
        </Box>
      </Grid>
      </Grid>
    )
  }
}

export default Profile;
