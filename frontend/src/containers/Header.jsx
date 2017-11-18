import { connect } from 'react-redux';
import { Header } from 'components/Header';
import { getIsLoggedIn, getUsername } from 'reducers/user';

function mapStateToProps(state) {
  const isLoggedIn = getIsLoggedIn(state);
  const username = getUsername(state);
  return {
    isLoggedIn,
    username,
  };
}
export default connect(
  mapStateToProps,
)(Header);
