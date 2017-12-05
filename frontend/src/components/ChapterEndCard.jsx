import React from 'react';
import PropTypes from 'prop-types';

import { CarouselWrapper } from 'components/CarouselWrapper';
import ImageLoader from 'containers/ImageLoader';
import UploadImage from 'containers/UploadImage';
import { getChapter } from 'reducers/books';

export class ChapterEndCard extends React.Component {
  constructor(props) {
    super(props);
    this.onClickToggleLike = this.toggleLike.bind(this);
    this.onClickToggleBookmark = this.onClickToggleBookmark.bind(this);
  }

  async onClickToggleBookmark(e) {
    e.preventDefault();
    this.props.bookmarkChapter({
      bookId: this.props.bookId,
      chapterId: this.props.chapterId,
      bookmark: !this.props.isBookmarked,
    });
  }

  async toggleLike(e) {
    e.preventDefault();
    this.props.likeChapter({
      bookId: this.props.bookId,
      chapterId: this.props.chapterId,
      toggle: !this.props.isLiked,
    });
  }

  render() {
    let likeBtn;
    if (this.props.isLiked) {
      likeBtn = <i className="material-icons liked">thumb_up</i>;
    } else {
      likeBtn = <i className="material-icons">thumb_up</i>;
    }
    let bookmarkBtn;
    if (this.props.isBookmarked) {
      bookmarkBtn = <i className="material-icons bookmarked">bookmark</i>;
    } else {
      bookmarkBtn = <i className="material-icons">bookmark</i>;
    }
    const childrenIds = getChapter(this.props.book, this.props.chapterId).get('childrenIds');
    let chapterEndComp;
    if (childrenIds === undefined || childrenIds.size === 0) {
      chapterEndComp = (<div className="card-content"><p className="chapter-end-text"> End of Book </p></div>);
    } else if (childrenIds.size === 1) {
      chapterEndComp = (
        <div className="card-content">
          <div className="card-content"><p className="chapter-end-text"> End of Chapter </p></div>
          <p className="select-branch-text"> Continue reading</p>
        </div>
      );
    } else {
      chapterEndComp = (
        <div className="card-content">
          <p className="chapter-end-text"> End of Chapter </p>
          <p className="select-branch-text"> Continue reading or select a different branch </p>
          <CarouselWrapper
            book={this.props.book}
            chapterId={this.props.chapterId}
            selectedChapterId={this.props.selectedChapterId ? this.props.selectedChapterId : childrenIds.get(0)}
            selectBranch={this.props.selectBranch}
            childrenIds={childrenIds}
          />
        </div>
      );
    }

    const chapter = getChapter(this.props.book, this.props.chapterId);
    const chapterUserId = this.props.book.get('chapters').get(this.props.chapterId).toJS().userId;
    if (this.props.currentUser === chapterUserId) {
      this.editDisplay = {
        display: 'inline',
        backgroundColor: '#2196f3',
        right: '170px',
      };
    } else {
      this.editDisplay = { display: 'none' };
    }

    return (
      <div className="row book-row">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            <div className="card-image">
              <ImageLoader img_url={this.props.img_url} alt="comic-cover" />
              {
                this.props.isLoggedIn &&
                <div>
                  <a
                    className="btn-floating halfway-fab waves-circle waves-effect waves-light blue chapter-end-bookmark-btn modal-trigger"
                    onClick={this.onClickToggleBookmark}
                  >{bookmarkBtn}
                  </a>
                  <a
                    className="btn-floating halfway-fab waves-circle waves-effect waves-light chapter-end-btn chapter-end-like-btn"
                    onClick={this.onClickToggleLike}
                  >{likeBtn}
                  </a>
                  <a
                    className="btn-floating halfway-fab waves-circle waves-effect waves-light chapter-end-btn modal-trigger chapter-end-add-btn"
                    href={`#add_chapter_modal-${chapter.get('id')}`}
                  ><i className="material-icons">add</i>
                  </a>
                  <a
                    className="btn-floating halfway-fab waves-circle waves-effect waves-light chapter-end-btn modal-trigger"
                    style={this.editDisplay}
                    href={`#edit_chapter_modal-${chapter.get('id')}`}
                  ><i className="material-icons">edit</i>
                  </a>
                </div>
              }
            </div>
            {chapterEndComp}
          </div>
        </div>
        <UploadImage
          fromNewBook={false}
          parentId={chapter.get('id')}
          bookId={chapter.get('bookId')}
          modalId={`add_chapter_modal-${chapter.get('id')}`}
          prevChapterTitle={chapter.get('title')}
        />
        <UploadImage
          fromNewBook={false}
          parentId={chapter.get('id')}
          bookId={chapter.get('bookId')}
          modalId={`edit_chapter_modal-${chapter.get('id')}`}
          prevChapterTitle={chapter.get('title')}
        />
      </div>
    );
  }
}

ChapterEndCard.propTypes = {
  book: PropTypes.object.isRequired,
  bookId: PropTypes.number.isRequired,
  img_url: PropTypes.string.isRequired,
  chapterId: PropTypes.number.isRequired,
  selectedChapterId: PropTypes.number,
  likeChapter: PropTypes.func.isRequired,
  bookmarkChapter: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  selectBranch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.number,
};

ChapterEndCard.defaultProps = {
  selectedChapterId: undefined,
  currentUser: undefined,
};
