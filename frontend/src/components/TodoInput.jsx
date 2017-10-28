import React from 'react';
import PropTypes from 'prop-types';

let input;

export class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    this.props.onSubmit(input.value);
    input.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <input id="input-add-todo" type="text" ref={(node) => { input = node; }} />
            <label htmlFor="input-add-todo"> Add todo </label>
          </div>
        </form>
      </div>
    );
  }
}

TodoInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
