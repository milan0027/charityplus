import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EnhancedTable from "./EnhancedTable";
import { getLeaderboard } from "../../actions/profile";
import Spinner from "../layout/Spinner";


const Leaderboard = ({ leaderboard: { users, loading, error }, getLeaderboard }) => {
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);
//   console.log(users);
  return (
    <section className='container'>
      {loading || users ===  null ? <Spinner /> :<EnhancedTable users={users} />}
    </section>
  );
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.object.isRequired,
  getLeaderboard: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);
