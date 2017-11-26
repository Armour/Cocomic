import { connect } from 'react-redux';

import { clearGalleryBooks, fetchPopularBooks, fetchNewestBooks } from 'actions/book';
import { HomePage } from 'pages/HomePage';

const mapStateToProps = state => ({
  popularBooks: state.popularBooks,
  newestBooks: state.newestBooks,
});

const mapDispatchToProps = dispatch => ({
  fetchPopularBooks: (offset, amount) => {
    dispatch(fetchPopularBooks(offset, amount));
  },
  fetchNewestBooks: (offset, amount) => {
    dispatch(fetchNewestBooks(offset, amount));
  },
  unmountGallery: () => {
    dispatch(clearGalleryBooks());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
