import { connect } from 'react-redux';

import { fetchBookIfNeeded, fetchChapterIfNeeded } from 'actions/book';
import { getBook } from 'reducers/books';
import { Book } from 'components/Book';

const mapStateToProps = (state, ownProps) => {
  const book = getBook(state, ownProps.bookId);

  if (book === undefined) {
    return {};
  }

  let chapterDepth = 0;
  if (ownProps.currentChapterId > 0) {
    chapterDepth = book.get('chapters').get(ownProps.currentChapterId).get('depth');
  }

  return {
    title: book.get('title'),
    description: book.get('description'),
    coverUrl: book.get('coverImage'),
    likeNum: book.get('likeNum'),
    chapters: book.get('chapters'),
    chapterDepth,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBookIfNeeded: (bookId) => {
    dispatch(fetchBookIfNeeded(bookId));
  },
  fetchChapterIfNeeded: (chapterId) => {
    dispatch(fetchChapterIfNeeded(chapterId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
