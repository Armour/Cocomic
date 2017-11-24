import React from 'react';
import PropTypes from 'prop-types';
// import MasonryInfiniteScroller from 'react-masonry-infinite';
import Masonry from 'react-masonry-component';

import { ComicCard } from 'components/ComicCard';

export class Gallery extends React.Component {
  componentDidMount() {
    this.props.fetchPopularBooks(0, 6);
  }

  render() {
    const masonryOptions = {
      transitionDuration: 0,
    };

    const childElements = this.props.popularBooks.map(el => (
      <ComicCard
        key={el.get('id')}
        img_url={el.get('coverImage')}
        title={el.get('title')}
        description={el.get('description')}
        author={el.get('user_id')}
        likes={el.get('like_sum')}
      />));

    return (
      <Masonry
        className="popular-gallery"
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >
        {childElements}
      </Masonry>
    );
  }
}

Gallery.propTypes = {
  fetchPopularBooks: PropTypes.func.isRequired,
  popularBooks: PropTypes.object.isRequired,
};
