import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
          <li key="upload"><NavLink activeClassName="active-link" to="/upload">Upload</NavLink></li>
          <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
          <li key="newest"><NavLink activeClassName="active-link" to="/newest">New</NavLink></li>
          <li key="about"><NavLink activeClassName="active-link" to="/about">About us</NavLink></li>
          <li key="login"><NavLink activeClassName="active-link" to="/login">Log in</NavLink></li>
          <li key="register"><NavLink activeClassName="active-link" to="/register">Register</NavLink></li>
        </ul>
      );
    } else {
      header = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li key="home"><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
          <li key="upload"><NavLink activeClassName="active-link" to="/upload">Upload</NavLink></li>
          <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
          <li key="newest"><NavLink activeClassName="active-link" to="/newest">New</NavLink></li>
          <li key="about"><NavLink activeClassName="active-link" to="/about">About us</NavLink></li>
          <li key="username"> Hello {this.props.username} </li>
          <li key="logout"><Link to="/user/logout" onClick={this.onClickLogout}>Log out</Link></li>
        </ul>
      );
    }
    return (
      <div id="the-header">
        <nav>
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
