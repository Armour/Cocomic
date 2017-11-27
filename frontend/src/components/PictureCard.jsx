import React from 'react';
import PropTypes from 'prop-types';

import ImageLoader from 'containers/ImageLoader';

export class PictureCard extends React.Component {
  render() {
    return (
      <div className="row book-row">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            <div className="card-image">
              <ImageLoader img_url={this.props.img_url} alt="comic-cover" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PictureCard.propTypes = {
  img_url: PropTypes.string.isRequired,
};
