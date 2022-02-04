import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
//import axios from "axios";
import { Label, FormGroup, Input } from "reactstrap";
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types';
import Alert from '../layout/alert';


const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    type_of: "false"
  });



  const { name, email,type_of, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2)  setAlert('Passwords do not match', 'danger', 5000)
    else {
      // const newUser ={
      //   name,
      //   email,
      //   password,
      //   type_of
      // }
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type':'application/json'
      //     }
      //   }

      //   const body = JSON.stringify(newUser)

      //   const res = await axios.post('/api/users', body, config)
      //   console.log(res.data)

      // } catch (err) {

      //   console.error(err.response.data)

      // }
      console.log(formData)
      register({ name, email,type_of, password})
    }
  };

  if(isAuthenticated) {
    return <Navigate to="/dashboard"/>
  }

  return (
    <Fragment>
      <section className='container'>
      <Alert/>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <FormGroup check>
            <Input name='type_of' type='radio' checked={type_of === "false"} value="false" onChange={(e) => onChange(e)} />{" "}
            <Label check>
              Register as User
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input name='type_of' type='radio' checked={type_of === "true"} value="true" onChange={(e) => onChange(e)} />{" "}
            <Label check>
              Register as Organization
            </Label>
          </FormGroup>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              minLength='6'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
              minLength='6'
            />
          </div>

          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};


Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

//state refers to reducer functions
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, 
    { setAlert, register })(Register)