import React from 'react';

const tooltipConfig = {
  delay: 300,
  position: 'top',
  tooltip: 'Click Me! >. <',
};

const displayToast = () => {
  Materialize.toast('I am a toast!', 3000); // eslint-disable-line no-undef
};

export class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.displayToast = displayToast.bind(this);
  }

  componentDidMount() {
    $('.carousel').carousel();
    $('.tooltipped').tooltip(tooltipConfig);
  }

  render() {
    return (
      <div className="carousel branch-carousel">
        <a className="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1" /></a>
        <a className="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2" /></a>
        <a className="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3" /></a>
        <a className="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4" /></a>
        <a className="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5" /></a>
      </div>
    );
  }
}
