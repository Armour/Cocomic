import React from 'react';
// import PropTypes from 'prop-types';
import { PictureCard } from 'components/PictureCard';
import { ChapterEndCard } from 'components/ChapterEndCard';

export class Chapter extends React.Component {
  render() {
    return (
      <div>
        <h1 id="chapter-title"> Chapter : Chapter Name </h1>
        <PictureCard img_url="sample-1" />
        <PictureCard img_url="sample-1" />
        <PictureCard img_url="sample-1" />
        <ChapterEndCard img_url="sample-1" />
      </div>
    );
  }
}

// Chapter.propTypes = {
//   id: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
// };
