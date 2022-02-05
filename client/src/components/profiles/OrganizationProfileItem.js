import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OrganizationProfileItem = ({ profile:{ 
    user:{ _id, name, avatar ,rating},
    handle,
    location,
}}) => {
  return <div className='profile bg-light'>
      <img src={avatar} alt="" className='round-img'/>
      <div>
          <h2>{name}</h2>
          <h6>@{handle}</h6>
          <p>Likes: {rating}</p>
          <p className='my-1'>{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
      </div>
  </div>;
};

OrganizationProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default OrganizationProfileItem;
