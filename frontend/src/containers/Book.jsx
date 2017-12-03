import { connect } from 'react-redux';

import { fetchBookIfNeeded, likeChapter, bookmarkChapter } from 'actions/book';
import { getBook } from 'reducers/books';
import { getIsLoggedIn } from 'reducers/user';
import { Book } from 'components/Book';

const mapStateToProps = (state, ownProps) => {
  const book = getBook(state, ownProps.bookId);

  if (book === undefined) {
    return {};
  }

  if (book.get('error')) {
    window.location.replace('/not/exist');
    return {};
  }

  const startingChapterId = ownProps.chapterId ? ownProps.chapterId : book.get('rootChapterId');
  window.history.replaceState(undefined, undefined, `#${startingChapterId}`);
  const isLoggedIn = getIsLoggedIn(state);
  return {
    book,
    isLoggedIn,
    title: book.get('title'),
    description: book.get('description'),
    coverUrl: book.get('coverImage'),
    likeNum: book.get('likeNum'),
    startingChapterId,
    uploadedChapterId: book.get('uploadedChapterId'),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBookIfNeeded: (bookId) => {
    dispatch(fetchBookIfNeeded(bookId));
  },
  likeChapter: (data) => {
    dispatch(likeChapter(data));
  },
  bookmarkChapter: (data) => {
    dispatch(bookmarkChapter(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
