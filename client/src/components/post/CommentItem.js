import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment,addCommentLike, removeCommentLike } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date,likes,unlikes },
  auth,
  deleteComment,
  addCommentLike,
  removeCommentLike
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button onClick={e => addCommentLike(postId, _id)} type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-up'></i>{' '}
          {likes.length > 0 && (
                 <span>{likes.length}</span>
          )}
         
        </button>
        <button onClick={e => removeCommentLike(postId, _id)} type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-down'></i>{' '}
          {unlikes.length > 0 && (
                 <span>{unlikes.length}</span>
          )}
        </button>
        {!auth.loading && user === auth.user._id && (
            <button onClick={e => deleteComment(postId, _id)} type="button" className="btn btn-danger">
                <i className="fas fa-times"></i>
            </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment, addCommentLike, removeCommentLike })(CommentItem);
