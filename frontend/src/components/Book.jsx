import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

import { Chapter } from 'components/Chapter';
import { BookCoverCard } from 'components/BookCoverCard';

configureAnchors({ offset: 10, scrollDuration: 200 });

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBookIfNeeded(this.props.bookId);
  }

  render() {
    const chapters = this.props.chapters.valueSeq().toArray().map((value, key) =>
      (
        <ScrollableAnchor key={value.get('id')} id={`chapter-${value.get('id')}`}>
          <div>
            {key === 0 &&
              <BookCoverCard img_url={this.props.coverUrl} title={this.props.title} description={this.props.description} />
            }
            <Chapter
              chapterId={value.get('id')}
              title={value.get('title')}
              pictures={value.get('images')}
              likeChapter={() => this.props.likeChapter(this.props.bookId, value.get('id'))}
            />
          </div>
        </ScrollableAnchor>
      ),
    );
    return (
      <div>
        {chapters}
      </div>
    );
  }
}

Book.propTypes = {
  bookId: PropTypes.number.isRequired,
  // currentChapterId: PropTypes.number,
  fetchBookIfNeeded: PropTypes.func.isRequired,
  likeChapter: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  coverUrl: PropTypes.string,
  // likeNum: PropTypes.number,
  chapters: PropTypes.object,
};

Book.defaultProps = {
  // currentChapterId: 0,
  title: '',
  description: '',
  coverUrl: '',
  // likeNum: 0,
  chapters: fromJS([]),
};
