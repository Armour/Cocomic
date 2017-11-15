import { connect } from 'react-redux';

import { fetchBookIfNeeded } from 'actions/book';
import { Book } from 'components/Book';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  fetchBookIfNeeded: (bookId) => {
    dispatch(fetchBookIfNeeded(bookId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
