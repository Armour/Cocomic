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
              <a
                className="btn-floating halfway-fab waves-effect waves-light chapter-end-btn chapter-end-like-btn"
                onClick={this.props.likeChapter}
              ><i className="material-icons">thumb_up</i>
              </a>
              <a className="btn-floating halfway-fab waves-effect waves-light chapter-end-btn"><i className="material-icons">create</i></a>
            </div>
            <div className="card-content">
              <p className="chapter-end-text"> End of Chapter </p>
              <p className="select-branch-text"> Continue reading or select a different branch </p>
              <Carousel chapterId={this.props.chapterId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChapterEndCard.propTypes = {
  img_url: PropTypes.string.isRequired,
  chapterId: PropTypes.number.isRequired,
  likeChapter: PropTypes.func.isRequired,
};
