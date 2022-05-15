import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [value, setValue] = React.useState('post');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (<div className="post-form">
  <div className="bg-primary p">
    <h3>Write a Post</h3>
  </div>
  <form className="form my-1" onSubmit={e => {
      e.preventDefault()
      addPost({ text, value })
      setText('')
      setValue('post')
  }}>
    <textarea
      name="text"
      cols="30"
      rows="5"
      placeholder="Say Something..."
      value={text}
      onChange={e => setText(e.target.value) }
      required
    ></textarea>
     <FormControl>
     <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="post" control={<Radio />} label="Post" />
        <FormControlLabel value="event" control={<Radio />} label="Event" />
       
      </RadioGroup>
      </FormControl>
    <input type="submit" className="btn btn-dark my-1" value="Submit" />
  </form>
</div>);
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
