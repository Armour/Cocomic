import React from 'react';
import PropTypes from 'prop-types';

export class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchImageIfNeeded({
      images: [this.props.img_url],
    });
  }

  render() {
    return (
      <img src={this.props.img_data} alt={this.props.alt} />
    );
  }
}

ImageLoader.propTypes = {
  img_url: PropTypes.string.isRequired,
  img_data: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fetchImageIfNeeded: PropTypes.func.isRequired,
};
