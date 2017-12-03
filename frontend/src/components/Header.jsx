import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown } from 'components/Dropdown';

export class Header extends React.Component {
  async componentDidMount() {
    $('.button-collapse').sideNav();
    this.onClickLogout = this.logout.bind(this);
    this.props.getUser();
  }

  async componentDidUpdate() {
    this.props.getUser();
  }

  async logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    let header;
    if (this.props.isLoggedIn === false) {
      header = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li key="home"><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
          <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
          <li key="newest"><NavLink activeClassName="active-link" to="/newest">New</NavLink></li>
          <li key="login"><NavLink activeClassName="active-link" to="/login">Log in</NavLink></li>
          <li key="register"><NavLink activeClassName="active-link" to="/register">Register</NavLink></li>
        </ul>
      );
    } else {
      header = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li key="home"><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
          <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
          <li key="newest"><NavLink activeClassName="active-link" to="/newest">New</NavLink></li>
          <Dropdown id="header-dropdown" title={`Hello ${this.props.username}`} logout={this.onClickLogout} />
        </ul>
      );
    }
    return (
      <div id="the-header">
        <nav className="blue-nav">
          <div className="nav-wrapper">
            <div className="container">
              <div className="brand-logo">
                <NavLink exact to="/">
                  <img className="logo" src={require('../image/logo.png')} alt="logo" />
                </NavLink>
              </div>
              <a href="#" data-activates="slide-out" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              {header}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};
Header.defaultProps = {
  username: '',
};
