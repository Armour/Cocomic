import React from 'react';
import PropTypes from 'prop-types';

import { Intro } from 'components/Intro';
import { HomeCard } from 'components/HomeCard';

export class HomePage extends React.Component {
  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    $('#the-header').removeClass('navbar-fixed');
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    this.getData();
  }

  componentWillUnmount() {
    this.props.unmountGallery();
  }

  getData() {
    if (this.props.popularBooks === undefined || this.props.popularBooks.size === 0) {
      this.props.fetchPopularBooks(0, 6);
    }
    if (this.props.newestBooks === undefined || this.props.newestBooks.size === 0) {
      this.props.fetchNewestBooks(0, 6);
    }
  }

  render() {
    const popularRow = this.props.popularBooks.take(6).map(el => (
      <HomeCard
        key={el.get('id')}
        img_url={el.get('coverImage')}
        title={el.get('title')}
        description={el.get('description')}
        author={el.get('username')}
        likes={el.get('like_sum')}
        pageUrl={`/book/${el.get('id')}`}
      />
    ));

    const newestRow = this.props.newestBooks.take(6).map(el => (
      <HomeCard
        key={el.get('id')}
        img_url={el.get('coverImage')}
        title={el.get('title')}
        description={el.get('description')}
        author={el.get('username')}
        likes={el.get('like_sum')}
        pageUrl={`/book/${el.get('id')}`}
      />
    ));

    return (
      <div>
        <Intro className="intro-panel" />
        <div className="main-wrap">
          <h2 className="page-title">Popular</h2>
          <div className="row">
            {popularRow}
          </div>
          <h2 className="page-title">New</h2>
          <div className="row">
            {newestRow}
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  unmountGallery: PropTypes.func.isRequired,
  fetchPopularBooks: PropTypes.func.isRequired,
  fetchNewestBooks: PropTypes.func.isRequired,
  popularBooks: PropTypes.object,
  newestBooks: PropTypes.object,
};

HomePage.defaultProps = {
  popularBooks: undefined,
  newestBooks: undefined,
};
