import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Header extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  render() {
    let header;
    console.log(JSON.stringify(this.props));
    if (this.props.isLoggedIn === false) {
      header = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li key="home"><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
          <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
          <li key="new"><NavLink activeClassName="active-link" to="/new">New</NavLink></li>
          <li key="about"><NavLink activeClassName="active-link" to="/about">About us</NavLink></li>
          <li key="login"><NavLink activeClassName="active-link" to="/login">Log in</NavLink></li>
          <li key="register"><NavLink activeClassName="active-link" to="/register">Register</NavLink></li>
        </ul>
      );
    } else {
      header = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li key="home"><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
          <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
          <li key="new"><NavLink activeClassName="active-link" to="/new">New</NavLink></li>
          <li key="about"><NavLink activeClassName="active-link" to="/about">About us</NavLink></li>
          <li key="username">{this.props.username}</li>
        </ul>
      );
    }
    return (
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
    );
  }
}
Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
};
Header.defaultProps = {
  username: '',
};
