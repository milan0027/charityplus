import React from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
const OrganizationProfileBottom = ({
  profile: {
      posts
  },
}) => {
    console.log(posts);
  return (
    <div className='profile-about bg-light p-2 my-1'>
        <h2 className='text-primary'>Posts</h2>
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

OrganizationProfileBottom.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default OrganizationProfileBottom;
