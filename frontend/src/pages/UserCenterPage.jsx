import React from 'react';
import PropTypes from 'prop-types';

import { UserCenterTab } from 'components/UserCenterTab';
import { UserCenter } from 'components/UserCenter';

export class UserCenterPage extends React.Component {
  render() {
    return (
      <div>
        <UserCenterTab
          isCollection={this.props.isCollection}
          fetchUserCenterBooks={() => this.props.fetchUserCenterBooks()}
          toFavorates={() => this.props.toFavorates()}
          toCollections={() => this.props.toCollections()}
          userName={this.props.userName}
        />
        <UserCenter
          isCollection={this.props.isCollection}
          books={this.props.books}
        />
      </div>
    );
  }
}

UserCenterPage.propTypes = {
  userName: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  isCollection: PropTypes.bool.isRequired,
  fetchUserCenterBooks: PropTypes.func.isRequired,
  toFavorates: PropTypes.func.isRequired,
  toCollections: PropTypes.func.isRequired,
};
