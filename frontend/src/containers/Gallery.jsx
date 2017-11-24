import { connect } from 'react-redux';

import { fetchPopularBooks } from 'actions/book';
import { Gallery } from 'components/Gallery';

const mapStateToProps = state => ({
  popularBooks: state.popularBooks,
});

const mapDispatchToProps = dispatch => ({
  fetchPopularBooks: (offset, amount) => {
    dispatch(fetchPopularBooks(offset, amount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gallery);
