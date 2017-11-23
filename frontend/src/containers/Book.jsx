import { connect } from 'react-redux';

import { fetchBookIfNeeded, likeChapter } from 'actions/book';
import { getBook } from 'reducers/books';
import { Book } from 'components/Book';
import { fromJS } from 'immutable';

const mapStateToProps = (state, ownProps) => {
  const book = getBook(state, ownProps.bookId);

  if (book === undefined) {
    return {
      title: 'Not found',
      description: '',
      coverUrl: 'sample-1',
      likeNum: 0,
      chapters: fromJS([]),
      chapterDepth: 0,
    };
  }

  return {
    title: book.get('title'),
    description: book.get('description'),
    coverUrl: book.get('coverImage'),
    likeNum: book.get('likeNum'),
    chapters: book.get('chapters'),
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
