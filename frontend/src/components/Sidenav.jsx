import React from 'react';
import { NavLink } from 'react-router-dom';

export class Sidenav extends React.Component {
  render() {
    return (
      <ul id="slide-out" className="side-nav">
        <li><NavLink exact to="/"><i className="material-icons">home</i>Home</NavLink></li>
        <li><NavLink to="/popular"><i className="material-icons">thumb_up</i>Popular</NavLink></li>
        <li><NavLink to="/newest"><i className="material-icons">fiber_new</i>New</NavLink></li>
        <li><NavLink to="/about"><i className="material-icons">info</i>About us</NavLink></li>
        <li><NavLink to="/login"><i className="material-icons">person_outline</i>Log in</NavLink></li>
        <li><NavLink to="/register"><i className="material-icons">person_add</i>Register</NavLink></li>
      </ul>
    );
  }
}
