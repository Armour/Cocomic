import { connect } from 'react-redux';

import { fetchUserCenterBooks, toggleUserCenterTab } from 'actions/book';
import { UserCenterPage } from 'pages/UserCenterPage';

const mapStateToProps = state => ({
  books: state.userCenter.get('books'),
  isCollection: state.userCenter.get('isCollection'),
});

const mapDispatchToProps = dispatch => ({
  fetchUserCenterBooks: () => {
    dispatch(fetchUserCenterBooks());
  },
  toggleUserCenterTab: () => {
    dispatch(toggleUserCenterTab());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCenterPage);
