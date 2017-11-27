import React from 'react';
import PropTypes from 'prop-types';

import { HomeCard } from 'components/HomeCard';

export class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    if (this.props.isCollection === 0) {
      this.props.fetchUserCollections();
    } else {
      this.props.fetchUserFavorates();
    }
  }

  render() {
    const books = this.props.isCollection === 0 ? this.props.userCollections : this.props.userFavorates;
    const childElements = books.map(el => (
      <HomeCard
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
        <div className="row">
          {childElements}
        </div>
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
};
