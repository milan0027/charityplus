import React from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import {  getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const DashboardActions = ({
  profile:{
    location,
    website,
    social,
    bio,
    user: { name, avatar },
  }
}) => {
  // useEffect(() =>{
  //   getCurrentProfile();
  // })
  // console.log(profile);
  useEffect(()=> {
    getCurrentProfile()
  },[])
  return(
    <>
    
    <div className="dash-buttons m-2">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
    </div>
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 className="large">{ name }</h1>
         
          <p>{location && <span>{location}</span>}</p>
          <div className="icons my-1">
              {
                  website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-globe fa-2x"></i>
                  </a>
                  )
              }
            {social && social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            
            {social && social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
            
          </div>
        </div>


          <div className='profile-grid my-1'>
            <div className='profile-about bg-light p-2'>
              {bio && (
                <>
                  <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
                  <p>{bio}</p>
                  <div className='line'></div>
                </>
              )}
            </div>
          </div>
    </>
  )
};

DashboardActions.protoTypes={
  profile: PropTypes.object.isRequired
}
export default connect( )(DashboardActions);