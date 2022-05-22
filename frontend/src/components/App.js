
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

    return (

        <Router>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/blog" element={<Blog />}/>
              <Route path="/login" element={<Login />}/>
          </Routes>
        </Router>
    );
  }

export default App;
