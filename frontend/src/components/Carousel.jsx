import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'immutable';

import ImageLoader from 'containers/ImageLoader';

export class Carousel extends React.Component {
  constructor() {
    super();
    this.state = { branchTitle: '', branchDescription: '' };
  }

  componentDidMount() {
    $(`#carousel-${this.props.chapterId}`).carousel({
      onCycleTo: (ele) => {
        this.selectItem($(ele).index());
        this.props.selectBranch(this.props.childrenIds.get($(ele).index()));
      },
      noWrap: true,
    });
  }

  selectItem(index) {
    const chapter = this.props.getChapter(this.props.childrenIds.get(index));
    this.setState({ branchTitle: chapter.get('title'), branchDescription: chapter.get('description') });
  }

  render() {
    const branchComp = this.props.childrenIds.map((childId, index) => {
      const chapter = this.props.getChapter(childId);
      const imageUrl = getIn(chapter, ['images', 0]);
      return (
        <a className="carousel-item" key={childId} >
          <ImageLoader img_url={imageUrl} alt={index.toString()} className="carousel-image" />
        </a>
      );
    });
    return (
      <div id={this.props.chapterId}>
        <div id={`carousel-${this.props.chapterId}`} className="carousel branch-carousel">
          {branchComp}
        </div>
        <p id="next-chapter-title" className="next-chapter-info" >{this.state.branchTitle}</p>
        <p id="next-chapter-description" className="next-chapter-info">{this.state.branchDescription}</p>
      </div>
    );
  }
}

Carousel.propTypes = {
  chapterId: PropTypes.number.isRequired,
  getChapter: PropTypes.func.isRequired,
  selectBranch: PropTypes.func.isRequired,
  childrenIds: PropTypes.object,
};

Carousel.defaultProps = {
  childrenIds: undefined,
};
