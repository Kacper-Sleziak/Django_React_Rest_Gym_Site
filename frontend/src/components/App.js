
import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import { ThemeProvider, createTheme  } from '@material-ui/core';
import { useEffect, useState} from 'react';
import HomePage from "./HomePage";
import Blog from "./Blog";
import Navbar from "./Navbar";
import Login from "./Login"


  function App() {

    // States saving informations about user
    // If user is not logged in all states are set to "None"
    const [nickname, setNickname] = useState("None")
    const [email, setEmail] = useState("None")
    const [token, setToken] = useState("None")

    const setUserData = (nickname, email, token) =>{
      setNickname(nickname)
      setEmail(email)
      setToken(token)
    }

    const login = (username, password) => { 
      console.log(username)
      console.log(password)

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

    return (

        <Router>
          <Routes>
              <Route path="/" element={
              <HomePage 
              userNickname={nickname} userEmail={email} userToken={token}/>}
              />
              <Route path="/blog" element={<Blog />}></Route>
              <Route path="/login" element={
              <Login 
              nickname={nickname} onLogin={login}/>}
              />
          </Routes>
        </Router>
    );
  }

export default App;
