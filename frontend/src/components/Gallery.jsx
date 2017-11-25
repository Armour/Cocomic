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
    if (this.props.orderType === 0) {
      if (this.state.offset === this.props.popularBooks.size) {
        this.props.fetchPopularBooks(this.state.offset, this.props.batchSize);
        this.state.offset += this.props.batchSize;
      }
    } else if (this.state.offset === this.props.newestBooks.size) {
      this.props.fetchNewestBooks(this.state.offset, this.props.batchSize);
      this.state.offset += this.props.batchSize;
    }
  }

  render() {
    const masonryOptions = {
      transitionDuration: 1000,
    };

    const galleryName = this.props.orderType === 0 ? 'gallery-popular' : 'gallery-new';
    const galleryBooks = this.props.orderType === 0 ? this.props.popularBooks : this.props.newestBooks;

    const childElements = galleryBooks.map(el => (
      <ComicCard
        key={el.get('id')}
        img_url={el.get('coverImage')}
        title={el.get('title')}
        description={el.get('description')}
        author={el.get('username')}
        likes={el.get('like_sum')}
        pageUrl={`/book/${el.get('id')}`}
      />));

    return (
      <Masonry
        className={galleryName}
        options={masonryOptions}
        onLayoutComplete={this.loadMore}
      >
        {childElements}
      </Masonry>
    );
  }
}

Gallery.propTypes = {
  orderType: PropTypes.number.isRequired, // 0: popular; 1: newest
  fetchPopularBooks: PropTypes.func.isRequired,
  fetchNewestBooks: PropTypes.func.isRequired,
  popularBooks: PropTypes.object.isRequired,
  newestBooks: PropTypes.object.isRequired,
  batchSize: PropTypes.number,
};

Gallery.defaultProps = {
  batchSize: 6,
};
