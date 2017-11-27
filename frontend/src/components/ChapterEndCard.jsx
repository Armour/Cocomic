import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'components/Carousel';

export class ChapterEndCard extends React.Component {
  constructor(props) {
    super(props);
    this.onClickToggleLike = this.toggleLike.bind(this);
  }

  async toggleLike(e) {
    e.preventDefault();
    this.props.likeChapter({
      chapterId: this.props.chapterId,
      toggle: !this.props.isLiked,
    });
  }
  render() {
    let likeBtn;
    if (this.props.isLiked) {
      likeBtn = <i className="material-icons liked">thumb_up</i>;
    } else {
      likeBtn = <i className="material-icons">thumb_up</i>;
    }
    const childrenIds = this.props.getChapter(this.props.chapterId).get('childrenIds');
    let chapterEndComp;
    if (childrenIds === undefined || childrenIds.size === 0) {
      chapterEndComp = (<div className="card-content"><p className="chapter-end-text"> End of Book </p></div>);
    } else if (childrenIds.size === 1) {
      chapterEndComp = (<div className="card-content"><p className="chapter-end-text"> End of Chapter </p></div>);
    } else {
      chapterEndComp = (
        <div className="card-content">
          <p className="chapter-end-text"> End of Chapter </p>
          <p className="select-branch-text"> Continue reading or select a different branch </p>
          <Carousel
            chapterId={this.props.chapterId}
            getChapter={this.props.getChapter}
            selectBranch={this.props.selectBranch}
            childrenIds={childrenIds}
          />
        </div>
      );
    }

    return (
      <div className="row book-row">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            <div className="card-image">
              <img src={require(`../image/${this.props.img_url}.jpg`)} alt="comic-cover" />
              <a
                className="btn-floating halfway-fab waves-effect waves-light chapter-end-btn chapter-end-like-btn"
                onClick={this.onClickToggleLike}
              >{likeBtn}
              </a>
              <a className="btn-floating halfway-fab waves-effect waves-light chapter-end-btn"><i className="material-icons">create</i></a>
            </div>
            {chapterEndComp}
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
  isLiked: PropTypes.bool.isRequired,
  getChapter: PropTypes.func.isRequired,
  selectBranch: PropTypes.func.isRequired,
};
