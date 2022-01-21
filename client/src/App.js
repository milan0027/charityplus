import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
