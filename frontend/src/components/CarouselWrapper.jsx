import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'components/Carousel';
import { getChapter } from 'reducers/books';

export class CarouselWrapper extends React.Component {
  render() {
    const chapter = getChapter(this.props.book, this.props.selectedChapterId);
    return (
      <div id={this.props.chapterId}>
        <Carousel {...this.props} />
        <p id="next-chapter-title" className="next-chapter-info" >{chapter.get('title')}</p>
        <p id="next-chapter-description" className="next-chapter-info">{chapter.get('description')}</p>
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
