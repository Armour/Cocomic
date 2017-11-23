import React from 'react';
import PropTypes from 'prop-types';
// import MasonryInfiniteScroller from 'react-masonry-infinite';


export class Masonry extends React.Component {
  componentDidMount() {
    this.props.fetchPopularBooks(0, 6);
  }

  render() {
    return (
      <div />
    );
  }
}

Masonry.propTypes = {
  fetchPopularBooks: PropTypes.func.isRequired,
//   chapterId: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   pictures: PropTypes.object.isRequired,
//   likeChapter: PropTypes.func.isRequired,
};
