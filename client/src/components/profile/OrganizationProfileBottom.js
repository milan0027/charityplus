import React from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
const OrganizationProfileBottom = ({
  post: { posts, loading }
}) => {
  return (
    <div className='profile-about bg-light p-2 my-1'>
        <h2 className='text-primary'>Posts</h2>
        {loading ? (<Spinner/>) : (<>
      {
          posts && posts.map((post)=>{
              return(
                  <PostItem post={post} key={post._id.toString()} />
              )
          })
      }</> )}
    </div>
  );
};

OrganizationProfileBottom.propTypes = {
  post: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  post: state.post,
})
export default connect(mapStateToProps)(OrganizationProfileBottom);
