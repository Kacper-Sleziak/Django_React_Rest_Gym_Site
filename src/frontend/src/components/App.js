import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

  function App() {

    return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />}></Route>
          </Routes>
      </Router>
    );
  }

  export default App
  render(<App />, document.getElementById("app"));

