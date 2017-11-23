import React from 'react';
import PropTypes from 'prop-types';
import { PictureCard } from 'components/PictureCard';
import { ChapterEndCard } from 'components/ChapterEndCard';

export class Chapter extends React.Component {
  render() {
    const pictureCards = this.props.pictures.skipLast(1).map(key =>
      <PictureCard key={key} img_url={key} />,
    );
    return (
      <div className="chapter-wrap">
        <h1 className="chapter-title"> {this.props.title} </h1>
        {pictureCards}
        <ChapterEndCard chapterId={this.props.chapterId} img_url={this.props.pictures.last()} likeChapter={this.props.likeChapter} />
      </div>
    );
  }
}

Chapter.propTypes = {
  chapterId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  pictures: PropTypes.object.isRequired,
  likeChapter: PropTypes.func.isRequired,
};
