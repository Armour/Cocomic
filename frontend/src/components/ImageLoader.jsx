import React from 'react';
import PropTypes from 'prop-types';

export class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.img_data === '') {
      this.props.fetchImageIfNeeded({
        images: [this.props.img_url],
      });
    }
  }

  render() {
    const frameStyle = {
      height: '200px',
    };
    const loaderStyle = {
      top: '50%',
    };
    const imgStyle = { height: this.props.height, width: this.props.width };
    if (this.props.img_data === '') {
      return (
        <div className="center" style={frameStyle}>
          <div className="preloader-wrapper active" style={loaderStyle}>
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <img
        src={`data:image/jpeg;base64,${this.props.img_data}`}
        alt={this.props.alt}
        style={imgStyle}
      />
    );
  }
}

ImageLoader.propTypes = {
  img_url: PropTypes.string.isRequired,
  img_data: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fetchImageIfNeeded: PropTypes.func.isRequired,
  height: PropTypes.any,
  width: PropTypes.any,
};

ImageLoader.defaultProps = {
  height: undefined,
  width: undefined,
};
