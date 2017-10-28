import React from 'react';
import PropTypes from 'prop-types';

export class TodoLink extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    if (this.props.active) {
      return (
        <a href="#" className="btn todo-filter-btn waves-effect waves-light" onClick={this.onClick}>
          {this.props.children}
        </a>
      );
    }
    return (
      <a href="#" className="btn-flat todo-filter-btn waves-effect waves-light" onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
}

TodoLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
