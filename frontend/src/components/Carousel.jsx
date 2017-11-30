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
    const chapter = getChapter(props.book, selectedChapterId);
    this.state = {
      branchTitle: chapter.get('title'),
      branchDescription: chapter.get('description'),
    };
    this.selectItem = this.selectItem.bind(this);
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
      afterChange: index => this.selectItem(index),
    };
  }

  // componentWillMount() {
  //   $(`#carousel-${this.props.chapterId}`).carousel('set', this.props.selectedChapterId);
  // }

  // componentDidMount() {
  //   $(`#carousel-${this.props.chapterId}`).carousel({
  //     noWrap: true,
  //   });
  // }


  selectItem(index) {
    const chapterId = this.props.childrenIds.get(index);
    const chapter = getChapter(this.props.book, chapterId);
    this.setState({ branchTitle: chapter.get('title'), branchDescription: chapter.get('description') });
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
            height="200px"
            width="200px"
          />
        </div>
      );
    });
    return (
      <div id={this.props.chapterId}>
        <Slider {...this.settings}>
          {branchComp}
        </Slider>
        <p id="next-chapter-title" className="next-chapter-info" >{this.state.branchTitle}</p>
        <p id="next-chapter-description" className="next-chapter-info">{this.state.branchDescription}</p>
      </div>
    );
  }
}

Carousel.propTypes = {
  book: PropTypes.object.isRequired,
  chapterId: PropTypes.number.isRequired,
  selectedChapterId: PropTypes.number,
  selectBranch: PropTypes.func.isRequired,
  childrenIds: PropTypes.object,
};

Carousel.defaultProps = {
  selectedChapterId: undefined,
  childrenIds: undefined,
};
