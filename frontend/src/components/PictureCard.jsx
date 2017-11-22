import React from 'react';
import PropTypes from 'prop-types';

export class PictureCard extends React.Component {
  render() {
    return (
      <div className="row book-row">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            <div className="card-image">
              <img src={require(`../image/${this.props.img_url}.jpg`)} alt="comic-cover" />
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
