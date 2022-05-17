import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import OrganizationProfileTop from '../profile/OrganizationProfileTop';
import OrganizationProfileAbout from '../profile/OrganizationProfileAbout';
import OrganizationProfileBottom from '../profile/OrganizationProfileBottom';
import UserProfileTop from '../profile/UserProfileTop';
import UserProfileAbout from '../profile/UserProfileAbout';
import UserProfileBottom from '../profile/UserProfileBottom';

const DashboardActions = ({profile, id}) => {
  return(
    <>
    
    <div className="dash-buttons m-2">
        <Link to="/edit-profile" className="btn btn-primary">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <button className='btn btn-primary'>Notifications</button>
    </div>
        { profile.type_of? (<> <div className='my-1'>
              <OrganizationProfileTop otherprofile={profile} id={id} />
              <OrganizationProfileAbout profile={profile} />
              <OrganizationProfileBottom  id={id}/>
              </div></>):(<><div className='my-1'>
              <UserProfileTop otherprofile={profile} id={id} />
              <UserProfileAbout profile={profile} />
              <UserProfileBottom profile={profile}/>
            </div></>)}
    </>
  )
};

DashboardActions.protoTypes={
  profile: PropTypes.object.isRequired
}
export default DashboardActions;