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
          chapterId={this.props.chapterId}
          bookId={this.props.bookId}
          img_url={this.props.pictures.last()}
          isLiked={this.props.isLiked}
          isBookmarked={this.props.isBookmarked}
          likeChapter={this.props.likeChapter}
          bookmarkChapter={this.props.bookmarkChapter}
          selectedChapterId={this.props.selectedChapterId}
          getChapter={this.props.getChapter}
          selectBranch={this.props.selectBranch}
        />
      </div>
    );
  }
}

Chapter.propTypes = {
  bookId: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  selectedChapterId: PropTypes.number,
  title: PropTypes.string.isRequired,
  pictures: PropTypes.object.isRequired,
  likeChapter: PropTypes.func.isRequired,
  bookmarkChapter: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  getChapter: PropTypes.func.isRequired,
  selectBranch: PropTypes.func.isRequired,
};

Chapter.defaultProps = {
  selectedChapterId: undefined,
};
