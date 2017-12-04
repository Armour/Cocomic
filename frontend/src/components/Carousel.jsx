import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'immutable';
import Slider from 'react-slick';

import ImageLoader from 'containers/ImageLoader';
import { getChapter } from 'reducers/books';

export class Carousel extends React.Component {
  constructor(props) {
    super(props);
    const selectedChapterId = this.props.selectedChapterId ? this.props.selectedChapterId : this.props.childrenIds.get(0);
    this.settings = {
      arrows: false,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      autoplay: false,
      centerMode: true,
      focusOnSelect: true,
      useCSS: true,
      initialSlide: this.props.childrenIds.indexOf(selectedChapterId),
      afterChange: index => this.selectItem(index),
      responsive: [
        { breakpoint: 600, settings: { slidesToShow: 1 } },
        { breakpoint: 100000, settings: { slidesToShow: 3 } },
      ],
    };
    this.selectItem = this.selectItem.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.childrenIds !== nextProps.childrenIds) return true;
    return false;
  }

  selectItem(index) {
    const chapterId = this.props.childrenIds.get(index);
    this.props.selectBranch(chapterId);
  }

  render() {
    const branchComp = this.props.childrenIds.map((childId, index) => {
      const chapter = getChapter(this.props.book, childId);
      const imageUrl = getIn(chapter, ['images', 0]);
      return (
        <div key={childId}>
          <ImageLoader
            img_url={imageUrl}
            alt={index.toString()}
            height="150px"
            width="200px"
          />
        </div>
      );
    });
    return (
      <Slider {...this.settings}>
        {branchComp}
      </Slider>
    );
  }
}

Carousel.propTypes = {
  book: PropTypes.object.isRequired,
  selectedChapterId: PropTypes.number.isRequired,
  childrenIds: PropTypes.object,
  selectBranch: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  childrenIds: undefined,
};
