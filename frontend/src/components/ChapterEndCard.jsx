import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'components/Carousel';

export class ChapterEndCard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            <div className="card-image">
              <img src={require(`../image/${this.props.img_url}.jpg`)} alt="comic-cover" />
              <a className="btn-floating halfway-fab waves-effect waves-light chapter-end-btn chapter-end-like-btn"><i className="material-icons">thumb_up</i></a>
              <a className="btn-floating halfway-fab waves-effect waves-light chapter-end-btn"><i className="material-icons">create</i></a>
            </div>
            <div className="card-content">
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChapterEndCard.propTypes = {
  img_url: PropTypes.string.isRequired,
};
