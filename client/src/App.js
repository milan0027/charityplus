import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { loadUser } from './actions/auth';
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
import Landing  from './components/layout/Landing';
import  Navbar  from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
//redux
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import UserProfiles from './components/profiles/UserProfiles';
import OrganizationProfiles from './components/profiles/OrganizationProfiles';
if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = ()=>{

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
return(
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofiles" element={<UserProfiles />} />
        <Route path="/organizationprofiles" element={<OrganizationProfiles />} />
        <Route path='/dashboard' element={<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>} />
        <Route path='/create-profile' element={<PrivateRoute>
          <CreateProfile/>
        </PrivateRoute>} />
        <Route path='/edit-profile' element={<PrivateRoute>
          <EditProfile/>
        </PrivateRoute>} />
      </Routes>
    </Fragment>
  </Router>
</Provider>
)};

export default App;
