import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sidenav } from 'components/Sidenav';
import { getIsLoggedIn, getUsername } from 'reducers/user';
import { logout, getUser } from 'actions/user';

function mapStateToProps(state, ownProps) {
  const isLoggedIn = getIsLoggedIn(state);
  const username = getUsername(state);
  return {
    isLoggedIn,
    username,
    history: ownProps.history,
  };
}

const mapDispatchToProps = dispatch => ({
  logout: (data) => {
    dispatch(logout(data));
  },
  getUser: (data) => {
    dispatch(getUser(data));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidenav));
