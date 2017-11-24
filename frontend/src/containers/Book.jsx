import { connect } from 'react-redux';

import { fetchBookIfNeeded, likeChapter } from 'actions/book';
import { getBook, traverseToRoot, traverseToLeaf, getChapter } from 'reducers/books';
import { Book } from 'components/Book';

const mapStateToProps = (state, ownProps) => {
  const book = getBook(state, ownProps.bookId);

  if (book === undefined) {
    return {
      title: 'Not found',
      description: '',
      coverUrl: 'sample-1',
      likeNum: 0,
    };
  }
  const startingChapterId = ownProps.chapterId ? ownProps.chapterId : book.get('rootChapterId');
  window.location.hash = `#${startingChapterId}`;

  return {
    title: book.get('title'),
    description: book.get('description'),
    coverUrl: book.get('coverImage'),
    likeNum: book.get('likeNum'),
    traverseToRoot: chapterId => traverseToRoot(state, ownProps.bookId, chapterId),
    traverseToLeaf: chapterId => traverseToLeaf(state, ownProps.bookId, chapterId),
    getChapter: chapterId => getChapter(state, ownProps.bookId, chapterId),
    startingChapterId,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBookIfNeeded: (bookId) => {
    dispatch(fetchBookIfNeeded(bookId));
  },
  likeChapter: (bookId, chapterId) => {
    dispatch(likeChapter(bookId, chapterId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
