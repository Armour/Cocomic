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
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      centerMode: true,
      focusOnSelect: true,
      useCSS: true,
      initialSlide: this.props.childrenIds.indexOf(selectedChapterId),
      afterChange: index => this.props.selectItem(index),
    };
  }

  shouldComponentUpdate() {
    return false;
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
            height="200px"
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
  selectedChapterId: PropTypes.number,
  childrenIds: PropTypes.object,
  selectItem: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  selectedChapterId: undefined,
  childrenIds: undefined,
};
