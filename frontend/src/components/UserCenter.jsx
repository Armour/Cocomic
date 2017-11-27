import React from 'react';
import PropTypes from 'prop-types';

import { HomeCard } from 'components/HomeCard';

export class UserCenter extends React.Component {
  render() {
    const childElements = this.props.books.map(el => (
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
          <a href="/newbook">
            <div className="col s12 m6 l4">
              <div className="valign-wrapper newbook-center">
                <a className="btn-floating btn-large waves-effect waves-light blue center-align"><i className="material-icons">add</i></a>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

UserCenter.propTypes = {
  books: PropTypes.object.isRequired,
};
