import React from 'react';

import { TOAST_DISPLAY_DURATION, TOOLTIP_DELAY_TIME } from 'constants/timers';

const tooltipConfig = {
  delay: TOOLTIP_DELAY_TIME,
  position: 'top',
  tooltip: 'Click Me! >. <',
};

const displayToast = () => {
  Materialize.toast('I am a toast!', TOAST_DISPLAY_DURATION); // eslint-disable-line no-undef
};

export class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.displayToast = displayToast.bind(this);
  }

  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    $('.tooltipped').tooltip(tooltipConfig);
  }

  render() {
    return (
      <div className="carousel carousel-slider center z-depth-3" data-indicators="true">
        <div className="carousel-fixed-item center">
          <a
            className="btn tooltipped waves-effect white grey-text darken-text-2"
            data-position={tooltipConfig.position}
            data-delay={tooltipConfig.delay}
            data-tooltip={tooltipConfig.tooltip}
            onClick={this.displayToast}
            onKeyDown={this.displayToast}
            role="button"
            tabIndex="0"
          >
            Focus me!
          </a>
        </div>
        <a className="carousel-item green white-text" href="#one!">
          <h2>First Panel</h2>
          <p className="white-text">This is your first panel</p>
        </a>
        <a className="carousel-item amber white-text" href="#two!">
          <h2>Second Panel</h2>
          <p className="white-text">This is your second panel</p>
        </a>
        <a className="carousel-item red white-text" href="#three!">
          <h2>Third Panel</h2>
          <p className="white-text">This is your third panel</p>
        </a>
        <a className="carousel-item purple white-text" href="#four!">
          <h2>Fourth Panel</h2>
          <p className="white-text">This is your fourth panel</p>
        </a>
      </div>
    );
  }
}
