import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import { ComicCard } from 'components/ComicCard';

export class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    if (this.state.offset === this.props.popularBooks.size) {
      this.props.fetchPopularBooks(this.state.offset, this.props.batchSize);
    }
    this.state.offset += this.props.batchSize;
  }

  render() {
    const masonryOptions = {
      transitionDuration: 1000,
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
        ref={c => this.masonry = c && c.masonry}
        className="popular-gallery"
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        onLayoutComplete={this.loadMore}
      >
        {childElements}
      </Masonry>
    );
  }
}

Gallery.propTypes = {
  fetchPopularBooks: PropTypes.func.isRequired,
  popularBooks: PropTypes.object.isRequired,
  batchSize: PropTypes.number,
};

Gallery.defaultProps = {
  batchSize: 6,
};
