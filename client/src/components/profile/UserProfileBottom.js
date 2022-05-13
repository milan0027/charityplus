import React from "react";
import PropTypes from "prop-types";
import CommentItemAtProfile from "./CommentItemAtProfile";
const UserProfileBottom = ({
  profile: {
      contributions
  },
}) => {
  console.log(contributions)
  return (
    <div className='profile-about bg-light p-2 my-1'>
        <h2 className='text-primary'>Contributions</h2>
      {
          contributions && contributions.map(({comment})=>{
              return(
                  <CommentItemAtProfile comment={comment} key={comment._id.toString()} />
              )
          })
      }
    </div>
  );
};

UserProfileBottom.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserProfileBottom;
