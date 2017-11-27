import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import { ComicCard } from 'components/ComicCard';

export class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  // componentWillUnmount() {
  //   this.state = {
  //     offset: 0,
  //   };
  //   this.props.unmountGallery();
  // }

  loadMore() {
    if (this.props.isCollection === 0) {
      if (this.state.offset === this.props.userCollections.size) {
        this.props.fetchUserCollections(this.state.offset, this.props.batchSize);
        this.state.offset += this.props.batchSize;
      }
    } else if (this.state.offset === this.props.userFavorates.size) {
      this.props.fetchUserFavorates(this.state.offset, this.props.batchSize);
      this.state.offset += this.props.batchSize;
    }
  }

  render() {
    const masonryOptions = {
      transitionDuration: 1000,
    };

    const masonryClassName = this.props.isCollection === 0 ? 'user-collection' : 'user-favorates';
    const books = this.props.isCollection === 0 ? this.props.userCollections : this.props.userFavorates;

    const childElements = books.map(el => (
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
      <div className="container">
        <Masonry
          className={masonryClassName}
          options={masonryOptions}
          onLayoutComplete={this.loadMore}
        >
          {childElements}
        </Masonry>
      </div>
    );
  }
}

UserCenter.propTypes = {
  isCollection: PropTypes.number.isRequired, // 0: popular; 1: newest
  fetchUserCollections: PropTypes.func.isRequired,
  fetchUserFavorates: PropTypes.func.isRequired,
  // unmountGallery: PropTypes.func.isRequired,
  userCollections: PropTypes.object.isRequired,
  userFavorates: PropTypes.object.isRequired,
  batchSize: PropTypes.number,
};

UserCenter.defaultProps = {
  batchSize: 6,
};
