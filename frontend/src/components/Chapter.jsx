import React from 'react';
import PropTypes from 'prop-types';
import { PictureCard } from 'components/PictureCard';
import { ChapterEndCard } from 'components/ChapterEndCard';

export class Chapter extends React.Component {
  render() {
    const pictureCards = this.props.pictures.map(key =>
      <PictureCard img_url={key} />,
    );
    return (
      <div>
        <h1 id="chapter-title"> Chapter : Chapter Name </h1>
        {pictureCards}
        <ChapterEndCard chapterID={this.props.chapterID} img_url="sample-1" />
      </div>
    );
  }
}

Chapter.propTypes = {
  chapterID: PropTypes.string.isRequired,
  pictures: PropTypes.array.isRequired,
};
