import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';

const App = ()=>
   <Router>
     <Fragment>
      <Navbar />
     
      <Routes>

      <Route  path="/" element={<Landing/>}> </Route>
      </Routes>
      <section className='container'>
        <Routes>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
        </Routes>
     
      </section>
     
    </Fragment>

   </Router>
    

export default App;
