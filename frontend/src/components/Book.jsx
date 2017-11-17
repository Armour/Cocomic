import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { Chapter } from 'components/Chapter';
import { BookCoverCard } from 'components/BookCoverCard';

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBookIfNeeded(this.props.bookId);
    this.props.fetchChapterIfNeeded(this.props.bookId, this.props.currentChapterId);
  }

  render() {
    const chapters = this.props.chapters.map(key =>
      <Chapter key={key.get('id')} chapterId={key.get('id')} title={key.get('title')} pictures={key.get('images')} />,
    );
    return (
      <div>
        {this.props.chapterDepth < 2 && (this.props.title !== '') &&
          <BookCoverCard img_url={this.props.coverUrl} title={this.props.title} description={this.props.description} />
        }
        {chapters}
      </div>
    );
  }
}

Book.propTypes = {
  bookId: PropTypes.number.isRequired,
  currentChapterId: PropTypes.number,
  chapterDepth: PropTypes.number,
  fetchBookIfNeeded: PropTypes.func.isRequired,
  fetchChapterIfNeeded: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  coverUrl: PropTypes.string,
  // likeNum: PropTypes.number,
  chapters: PropTypes.object,
};

Book.defaultProps = {
  currentChapterId: 0,
  chapterDepth: 0,
  title: '',
  description: '',
  coverUrl: '',
  // likeNum: 0,
  chapters: fromJS([]),
};
