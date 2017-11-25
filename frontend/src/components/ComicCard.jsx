import React from 'react';
import PropTypes from 'prop-types';

export class ComicCard extends React.Component {
  render() {
    return (
      <div className="comic-card-wrap">
        <a href={this.props.pageUrl}>
          <div className="card hoverable">
            <div className="card-image">
              <img src={require(`../image/${this.props.img_url}.jpg`)} alt="comic-cover" />
            </div>
            <div className="card-content">
              <span className="card-title">{this.props.title}</span>
              <p className="card-description">{this.props.description}</p>
              <p className="author-like">{this.props.author} | {this.props.likes} likes</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

ComicCard.propTypes = {
  img_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  pageUrl: PropTypes.string.isRequired,
};
