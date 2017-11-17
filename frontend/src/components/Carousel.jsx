import React from 'react';
import PropTypes from 'prop-types';

export class Carousel extends React.Component {
  componentDidMount() {
    $(`#carousel-${this.props.chapterId}`).carousel({
      onCycleTo: (ele) => {
        $(`#${this.props.chapterId} #next-chapter-title`).text(`Chapter ${$(ele).index().toString()}`);
        $(`#${this.props.chapterId} #next-chapter-description`).text(`${$(ele).index().toString()} So, after those actions get dispatched, where do they get handled? That happens in the reducer.`);
      },
    });
  }

  render() {
    return (
      <div id={this.props.chapterId}>
        <div id={`carousel-${this.props.chapterId}`} className="carousel branch-carousel">
          <a className="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1" alt="one" /></a>
          <a className="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2" alt="two" /></a>
          <a className="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3" alt="two" /></a>
          <a className="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4" alt="two" /></a>
          <a className="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5" alt="two" /></a>
        </div>
        <p id="next-chapter-title" className="next-chapter-info" >haha</p>
        <p id="next-chapter-description" className="next-chapter-info" />
      </div>
    );
  }
}

Carousel.propTypes = {
  chapterId: PropTypes.number.isRequired,
};
