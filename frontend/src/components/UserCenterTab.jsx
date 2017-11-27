import React from 'react';
// import PropTypes from 'prop-types';

export class UserCenterTab extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="container">
        <h1 className="page-title">My Center</h1>
        <div className="navbar-fixed">
          <nav className="user-center-nav nav-extended z-depth-0">
            <div id="user_center_tab" className="nav-content">
              <ul className="tabs tabs-transparent">
                <li className="tab user-center-tab-li right-border-black"><a className="active user-center-tab-text" href="#">My Collections</a></li>
                <li className="tab user-center-tab-li"><a className="user-center-tab-text" href="#">Favorates</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
// Header.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   username: PropTypes.string,
//   logout: PropTypes.func.isRequired,
//   getUser: PropTypes.func.isRequired,
// };
// Header.defaultProps = {
//   username: '',
// };
