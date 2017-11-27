import React from 'react';
// import PropTypes from 'prop-types';

import { UserCenterTab } from 'components/UserCenterTab';
import UserCenter from 'containers/UserCenter';

export class UserCenterPage extends React.Component {
  render() {
    return (
      <div>
        <UserCenterTab />
        <UserCenter key={0} isCollection={0} />
      </div>
    );
  }
}

// BookPage.propTypes = {
//   match: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
// };
