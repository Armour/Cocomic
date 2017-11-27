import React from 'react';
import PropTypes from 'prop-types';

import { UserCenterTab } from 'components/UserCenterTab';
import { UserCenter } from 'components/UserCenter';

export class UserCenterPage extends React.Component {
  render() {
    return (
      <div>
        <UserCenterTab
          fetchUserCenterBooks={() => this.props.fetchUserCenterBooks()}
          toggleUserCenterTab={() => this.props.toggleUserCenterTab()}
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
  books: PropTypes.object.isRequired,
  isCollection: PropTypes.bool.isRequired,
  fetchUserCenterBooks: PropTypes.func.isRequired,
  toggleUserCenterTab: PropTypes.func.isRequired,
};
