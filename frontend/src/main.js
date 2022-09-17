
import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import { ThemeProvider, createTheme  } from '@material-ui/core';
import { useEffect, useState} from 'react';
import HomePage from "./views/HomePage";
import Blog from "./views/Blog";
import Navbar from "./components/assets/Navbar";
import Footer from "./components/assets/Footer";
import Login from "./views/Login";
import './static/css/global.css';

  function Main() {
    return (
      <div id="root_container">
        <div id="main_bg">
          <Navbar/>
            <Router>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/blog" element={<Blog />}/>
                  <Route path="/login" element={<Login />}/>
              </Routes>
            </Router>
        </div>   
        <Footer/>
      </div>
    );
  }

export default Main;
