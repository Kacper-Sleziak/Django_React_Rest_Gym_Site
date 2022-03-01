
import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
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
              userNickname={nickname} userEmail={email} userToken={token}/>}
              />
          </Routes>
      </Router>
    );
  }

export default App;
