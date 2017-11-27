import { connect } from 'react-redux';

import { clearGalleryBooks, fetchUserCollections, fetchUserFavorates } from 'actions/book';
import { UserCenter } from 'components/UserCenter';

const mapStateToProps = state => ({
  userCollections: state.userCollections,
  userFavorates: state.userFavorates,
});

const mapDispatchToProps = dispatch => ({
  fetchUserCollections: (offset, amount) => {
    dispatch(fetchUserCollections(offset, amount));
  },
  fetchUserFavorates: (offset, amount) => {
    dispatch(fetchUserFavorates(offset, amount));
  },
  unmountGallery: () => {
    dispatch(clearGalleryBooks());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCenter);
