import React from "react";
import PropTypes from 'prop-types'
import { follow } from "../../actions/profile";
import { connect } from "react-redux";
const OrganizationProfileTop = ({ profile: {
    
    location,
    website,
    social,
    handle,
    followers,
    user: {
        name,
        avatar,
        rating
    }
}, auth, follow, id}) => {
    return (
        <>
        <div className="profile bg-primary p-2">
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <div>

          
         <h2>{name}</h2>
          <h4>@{handle}</h4>
          <h4><i class="fas fa-bolt"></i> {rating}</h4>
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
          <button onClick={(e) => follow(id)} className='btn btn-dark' style={{ width: '160px'}}>
              { auth.isAuthenticated &&
              auth.loading === false && followers.filter((item) => item.user.toString() ===  auth.user._id ).length > 0
                ? "Unfollow"
                : "Follow"}
            </button>
            <button className='btn btn-dark my-1' style={{ width: '160px'}}>
          Followers {followers.length > 0 && (
                <span className='comment-count'>{followers.length}</span>
          )}
        </button>
          </div>
        </div>
        </>
    )
}

OrganizationProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {follow})( OrganizationProfileTop)