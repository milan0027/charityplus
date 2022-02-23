import React from "react";
import PropTypes from "prop-types";

const UserProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className='line'></div>
        </>
      )}
    </div>
  );
};

UserProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserProfileAbout;
