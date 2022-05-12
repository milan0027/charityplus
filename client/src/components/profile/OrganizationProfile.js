import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import OrganizationProfileTop from "./OrganizationProfileTop";
import { getOrganizationProfileById, follow } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import OrganizationProfileAbout from "./OrganizationProfileAbout";
import NotFound from "../layout/NotFound";
import Alert from "../layout/alert";
const OrganizationProfile = ({
  follow,
  getOrganizationProfileById,
  profile: { profile, loading, error },
  auth,
}) => {
  let { id } = useParams();
  useEffect(() => {
    getOrganizationProfileById(id);
  }, [getOrganizationProfileById, id]);

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        {loading || profile === null ? (
          error === null ? (
            <Spinner />
          ) : (
            <NotFound />
          )
        ) : (
          <Fragment>
            <Link to='/OrganizationProfiles' className='btn btn-light'>
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit Profile
                </Link>
              )}
            <button onClick={(e) => follow(id)} className='btn btn-primary'>
              { auth.isAuthenticated &&
              auth.loading === false && profile.followers.filter((item) => item.user.toString() ===  auth.user._id ).length > 0
                ? "Unfollow"
                : "Follow"}
            </button>
            <div className='profile-grid my-1'>
              <OrganizationProfileTop profile={profile} />
              <OrganizationProfileAbout profile={profile} />
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

OrganizationProfile.propTypes = {
  getOrganizationProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getOrganizationProfileById, follow })(
  OrganizationProfile
);
