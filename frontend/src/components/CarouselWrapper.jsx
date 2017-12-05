import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'components/Carousel';
import { getChapter } from 'reducers/books';

export class CarouselWrapper extends React.Component {
  render() {
    const chapter = getChapter(this.props.book, this.props.selectedChapterId);
    const username = chapter.get('username');
    const likeSum = chapter.get('likeSum');
    return (
      <div>
        <Carousel {...this.props} />
        <p className="next-chapter-info next-chapter-title" >{chapter.get('title')}</p>
        <p className="next-chapter-info" >{username} | {likeSum} likes</p>
        <p className="next-chapter-info next-chapter-description">{chapter.get('description')}</p>
      </div>
    );
  }
}

CarouselWrapper.propTypes = {
  book: PropTypes.object.isRequired,
  chapterId: PropTypes.number.isRequired,
  selectedChapterId: PropTypes.number.isRequired,
  selectBranch: PropTypes.func.isRequired,
  childrenIds: PropTypes.object,
};

CarouselWrapper.defaultProps = {
  childrenIds: undefined,
};
