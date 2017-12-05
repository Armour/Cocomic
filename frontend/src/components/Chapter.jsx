import React from 'react';
import PropTypes from 'prop-types';
import { PictureCard } from 'components/PictureCard';
import { ChapterEndCard } from 'components/ChapterEndCard';

export class Chapter extends React.Component {
  render() {
    const pictureCards = this.props.pictures.skipLast(1).map(value =>
      <PictureCard key={value} img_url={value} />,
    );
    return (
      <div className="chapter-wrap">
        <h1 className="chapter-title"> {this.props.title} </h1>
        {pictureCards}
        <ChapterEndCard
          book={this.props.book}
          chapterId={this.props.chapterId}
          bookId={this.props.bookId}
          img_url={this.props.pictures.last()}
          isLiked={this.props.isLiked}
          isBookmarked={this.props.isBookmarked}
          likeChapter={this.props.likeChapter}
          bookmarkChapter={this.props.bookmarkChapter}
          selectedChapterId={this.props.selectedChapterId}
          selectBranch={this.props.selectBranch}
          isLoggedIn={this.props.isLoggedIn}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

Chapter.propTypes = {
  book: PropTypes.object.isRequired,
  bookId: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  selectedChapterId: PropTypes.number,
  title: PropTypes.string.isRequired,
  pictures: PropTypes.object.isRequired,
  likeChapter: PropTypes.func.isRequired,
  bookmarkChapter: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  selectBranch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.number,
};

Chapter.defaultProps = {
  selectedChapterId: undefined,
  currentUser: undefined,
};
