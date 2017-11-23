import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Scroll from 'react-scroll';

import { Chapter } from 'components/Chapter';
import { BookCoverCard } from 'components/BookCoverCard';

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBookIfNeeded(this.props.bookId);
  }

  render() {
    const chaptersData = this.props.chapters.valueSeq().toArray().filter(value => value.get('id') !== undefined);
    const chaptersComp = chaptersData.map(value =>
      (
        <Scroll.Element key={value.get('id')} id={value.get('id').toString()}>
          <div>
            {value.get('parentId') === null &&
              <BookCoverCard img_url={this.props.coverUrl} title={this.props.title} description={this.props.description} />
            }
            <Scroll.Link activeClass="active" to={value.get('id').toString()} spy smooth hashSpy hidden>
            Test 1
            </Scroll.Link>
            <Chapter
              chapterId={value.get('id')}
              title={value.get('title')}
              pictures={value.get('images')}
              likeChapter={() => this.props.likeChapter(this.props.bookId, value.get('id'))}
            />
          </div>
        </Scroll.Element>
      ),
    );
    return (
      <div className="book-wrap">
        {chaptersComp}
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
