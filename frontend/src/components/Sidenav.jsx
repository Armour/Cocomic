import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Sidenav extends React.Component {
  async componentDidMount() {
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
    let sidenav;
    if (this.props.isLoggedIn === false) {
      sidenav = (
        <ul id="slide-out" className="side-nav">
          <li><NavLink exact to="/"><i className="material-icons">home</i>Home</NavLink></li>
          <li><NavLink to="/popular"><i className="material-icons">thumb_up</i>Popular</NavLink></li>
          <li><NavLink to="/newest"><i className="material-icons">fiber_new</i>New</NavLink></li>
          <li><NavLink to="/about"><i className="material-icons">info</i>About us</NavLink></li>
          <li><NavLink to="/login"><i className="material-icons">person_outline</i>Log in</NavLink></li>
          <li><NavLink to="/register"><i className="material-icons">person_add</i>Register</NavLink></li>
        </ul>
      );
    } else {
      sidenav = (
        <ul id="slide-out" className="side-nav">
          <li><NavLink exact to="/"><i className="material-icons">home</i>Home</NavLink></li>
          <li><NavLink to="/popular"><i className="material-icons">thumb_up</i>Popular</NavLink></li>
          <li><NavLink to="/newest"><i className="material-icons">fiber_new</i>New</NavLink></li>
          <li><NavLink to="/about"><i className="material-icons">info</i>About us</NavLink></li>
          <li><NavLink activeClassName="active-link" to="/userCenter"><i className="material-icons">account_circle</i>My Center</NavLink></li>
          <li><Link to="/user/logout" onClick={this.onClickLogout}><i className="material-icons">exit_to_app</i>Log out</Link></li>
        </ul>
      );
    }
    return (
      <div>
        { sidenav }
      </div>
    );
  }
}
Sidenav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};
