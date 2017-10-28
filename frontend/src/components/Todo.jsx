import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    if (this.props.completed) {
      return (
        <a href="#" className="collection-item waves-effect" onClick={this.onClick} style={{ textDecoration: 'line-through', color: 'gray' }}>
          <div className="truncate">
            {this.props.text}
          </div>
        </a>
      );
    }
    return (
      <a href="#" className="collection-item waves-effect waves-teal" onClick={this.onClick} style={{ textDecoration: 'none' }}>
        <div className="truncate">
          {this.props.text}
        </div>
      </a>
    );
  }
}

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
