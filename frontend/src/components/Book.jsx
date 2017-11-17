import React from 'react';
import PropTypes from 'prop-types';

import { Chapter } from 'components/Chapter';

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBookIfNeeded(this.props.bookId);
  }

  render() {
    const chapters = this.props.chapters.map(key =>
      <Chapter key={key.get('id')} chapterID={key.get('id')} pictures={key.get('images')} />,
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
  fetchBookIfNeeded: PropTypes.func.isRequired,
  // title: PropTypes.string,
  // description: PropTypes.string,
  // coverUrl: PropTypes.string,
  // likeNum: PropTypes.number,
  chapters: PropTypes.array,
};

Book.defaultProps = {
  // title: '',
  // description: '',
  // coverUrl: '',
  // likeNum: 0,
  chapters: [],
};
