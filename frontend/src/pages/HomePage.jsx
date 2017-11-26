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
    const popularRow1 = this.props.popularBooks.take(3).map(el => (
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

    const popularRow2 = this.props.popularBooks.take(6).takeLast(3).map(el => (
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

    const newestRow1 = this.props.newestBooks.take(3).map(el => (
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

    const newestRow2 = this.props.newestBooks.take(6).takeLast(3).map(el => (
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
          <h1 className="page-title">Popular</h1>
          <div className="row">
            {popularRow1}
          </div>
          <div className="row">
            {popularRow2}
          </div>
          <h1 className="page-title">New</h1>
          <div className="row">
            {newestRow1}
          </div>
          <div className="row">
            {newestRow2}
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
