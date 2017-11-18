import { connect } from 'react-redux';

import { fetchBookIfNeeded, fetchChapterIfNeeded, likeChapter } from 'actions/book';
import { getBook, getChapter } from 'reducers/books';
import { Book } from 'components/Book';

const mapStateToProps = (state, ownProps) => {
  const book = getBook(state, ownProps.bookId);

  if (book === undefined) {
    return {};
  }

  let chapterDepth = 0;
  if (ownProps.currentChapterId > 0) {
    const chapter = getChapter(state, ownProps.bookId, ownProps.chapterId);
    chapterDepth = chapter === undefined ? 0 : chapter.get('depth');
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
  fetchChapterIfNeeded: (bookId, chapterId) => {
    dispatch(fetchChapterIfNeeded(bookId, chapterId));
  },
  likeChapter: (bookId, chapterId) => {
    dispatch(likeChapter(bookId, chapterId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
