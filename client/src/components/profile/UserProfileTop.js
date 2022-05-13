import React from "react";
import PropTypes from 'prop-types'
const UserProfileTop = ({ profile: {
    
    location,
    website,
    social,
    handle,
    following,
    user: {
        name,
        avatar,
        rating
    }
}}) => {
    return (
      <>
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img"
          src={avatar}
          alt=""
        />
        <div>

        
       <h2>{name}</h2>
        <h4>@{handle}</h4>
        <h4>Rating: {rating}</h4>
        <h4 className='my-1'>{location && <span><i class="fa fa-map-marker" aria-hidden="true"></i> {location}</span>}</h4>
       
        <div className="icons">
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
        <div>
          <button className='btn btn-dark my-1' style={{ width: '160px'}}>
        Following {following.length > 0 && (
              <span className='comment-count'>{following.length}</span>
        )}
      </button>
        </div>
      </div>
      </>
    )
}

UserProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default UserProfileTop;