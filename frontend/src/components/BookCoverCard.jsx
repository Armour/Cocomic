import React from 'react';
import PropTypes from 'prop-types';

import ImageLoader from 'containers/ImageLoader';

export class BookCoverCard extends React.Component {
  render() {
    return (
      <div className="row book-row book-card-wrap">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            <div className="card-image">
              <ImageLoader img_url={this.props.img_url} alt="comic-cover" />
            </div>
            <div className="card-content">
              <span className="card-title">{this.props.title}</span>
              <p>{this.props.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookCoverCard.propTypes = {
  img_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // author: PropTypes.string.isRequired,
};
