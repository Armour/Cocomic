import { connect } from 'react-redux';

import { fetchPopularBooks } from 'actions/book';
import { Masonry } from 'components/Masonry';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  fetchPopularBooks: (offset, amount) => {
    dispatch(fetchPopularBooks(offset, amount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Masonry);
