import React from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
const UserProfileBottom = ({
  profile: {
      contributions
  },
}) => {
    console.log(posts);
  return (
    <div className='profile-about bg-light p-2'>
        <h2 className='text-primary'>Contributions</h2>
      {
          posts && posts.map(({post})=>{
              return(
                  <PostItem post={post} key={post._id.toString()} />
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
