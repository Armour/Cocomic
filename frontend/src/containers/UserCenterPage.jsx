import { connect } from 'react-redux';

import { fetchUserCenterBooks, toFavorates, toCollections } from 'actions/userCenter';
import { UserCenterPage } from 'pages/UserCenterPage';

const mapStateToProps = state => ({
  books: state.userCenter.get('books'),
  isCollection: state.userCenter.get('isCollection'),
  userName: state.register.get('username'),
});

const mapDispatchToProps = dispatch => ({
  fetchUserCenterBooks: () => {
    dispatch(fetchUserCenterBooks());
  },
  toFavorates: () => {
    dispatch(toFavorates());
  },
  toCollections: () => {
    dispatch(toCollections());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCenterPage);
