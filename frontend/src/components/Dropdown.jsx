import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { upperCaseFirstChar } from 'utils';

export class Dropdown extends React.Component {
  componentDidMount() {
    $('.dropdown-button').dropdown();
  }

  render() {
    const links = this.props.dropdownLists.map(key =>
      <li key={key}><NavLink activeClassName="active-link" to={`/${key}`}>{upperCaseFirstChar(key)}</NavLink></li>,
    );
    return (
      <ul id={this.props.id} className="dropdown-content">
        {links}
      </ul>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  dropdownLists: PropTypes.arrayOf(PropTypes.string).isRequired,
};
