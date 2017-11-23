import { connect } from 'react-redux';
import { Header } from 'components/Header';
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
