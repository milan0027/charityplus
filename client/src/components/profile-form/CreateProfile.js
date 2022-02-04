import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { createProfile } from '../../actions/profile'
import Alert from '../layout/alert';

const CreateProfile = ({  createProfile,  profile: { request_profile} }) => {
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
      handle:'',
      location: '',
      website: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      type_of: false
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
      handle,
      location,
      bio,
      website,
      twitter,
      facebook,
      linkedin,
      instagram

} = formData

const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})


const onSubmit = async (e) => {
  e.preventDefault();

  createProfile(formData);
};

useEffect(() => {
  console.log(request_profile);
  if (request_profile) {
    navigate("/dashboard");
  }
}, [request_profile]);
 
 return (<Fragment>
    <section className='container'>
    <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <Alert/>
      <form className="form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <input type="text" placeholder="Handle" name="handle"
          value={handle} onChange={e=> onChange(e)} />
          <small className="form-text">*Give yourselves a unique handle</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" 
          value={location} onChange={e=> onChange(e)} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        {  (<div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>)}
        

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"
          value={bio} onChange={e=> onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={()=> toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && <Fragment>
          <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter"
          value={twitter} onChange={e=> onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" 
          value={facebook} onChange={e=> onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin"
          value={linkedin} onChange={e=> onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" 
          value={instagram} onChange={e=> onChange(e)}/>
        </div>
        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
      </section>

  </Fragment>);
};


CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  profile: state.profile,
 
})

export default connect(mapStateToProps, { createProfile })(CreateProfile);
