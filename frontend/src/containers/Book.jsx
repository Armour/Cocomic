import { connect } from 'react-redux';

import { fetchBookIfNeeded } from 'actions/book';
import { getBook } from 'reducers/books';
import { Book } from 'components/Book';

const mapStateToProps = (state, ownProps) => {
  const book = getBook(state, parseInt(ownProps.bookId, 10));

  if (book === undefined) {
    return {};
  }
  return {
    title: book.get('title'),
    description: book.get('description'),
    coverUrl: book.get('coverUrl'),
    likeNum: book.get('likeNum'),
    chapters: book.get('chapters'),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBookIfNeeded: (bookId) => {
    dispatch(fetchBookIfNeeded(bookId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
