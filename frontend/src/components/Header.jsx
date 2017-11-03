import React from 'react';
import { a } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <span className="brand-logo"><NavLink exact to="/">Logo</NavLink></span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li key="home"><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
              <li key="popular"><NavLink activeClassName="active-link" to="/popular">Popular</NavLink></li>
              <li key="new"><NavLink activeClassName="active-link" to="/new">New</NavLink></li>
              <li key="about"><NavLink activeClassName="active-link" to="/about">About us</NavLink></li>
              <li key="login"><NavLink activeClassName="active-link" to="/login">Log in</NavLink></li>
              <li key="register"><NavLink activeClassName="active-link" to="/register">Register</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
