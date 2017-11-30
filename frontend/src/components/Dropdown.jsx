import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

export class Dropdown extends React.Component {
  componentDidMount() {
    $('.dropdown-button').dropdown();
  }

  render() {
    return (
      <li className="dropdown-li" key="dropdown">
        <a className="dropdown-button" data-beloworigin="true" data-activates="header-dropdown">{this.props.title}</a>
        <ul id={this.props.id} className="dropdown-content">
          <li className="dropdown-nav"><NavLink activeClassName="active-link" to="/userCenter"><span>My Center</span></NavLink></li>
          <li className="dropdown-nav"><Link to="/user/logout" onClick={this.props.logout}><span>Log out</span></Link></li>
        </ul>
      </li>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};
