import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../layout/alert';
import { follow } from '../../actions/profile'
import { connect } from 'react-redux';
const OrganizationProfileItem = ({ profile:{ 
    user:{ _id, name, avatar ,rating},
    handle,
    location
},follow}) => {
  return <div className='profile bg-light'>
      <img src={avatar} alt="" className='round-img'/>
      <div>
          <h2>{name}</h2>
          <h6>@{handle}</h6>
          <p>Likes: {rating}</p>
          <p className='my-1'>{location && <span>{location}</span>}</p>
          <Link to={`/profile/organization/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
          <button onClick={e => follow(_id)} className='btn btn-primary'>
            
          </button>
      </div>
  </div>;
};

OrganizationProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired
};

export default connect(null, {follow})(OrganizationProfileItem);
