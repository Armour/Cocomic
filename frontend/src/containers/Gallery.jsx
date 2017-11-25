import { connect } from 'react-redux';

import { fetchPopularBooks, fetchNewestBooks } from 'actions/book';
import { Gallery } from 'components/Gallery';

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gallery);
