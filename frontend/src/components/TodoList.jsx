import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from 'components/Todo';

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    return () => {
      this.props.onClick(id);
    };
  }

  render() {
    const todoList = this.props.todos.map(todo =>
      todo !== undefined ? <Todo key={todo.id} {...todo} onClick={this.onClick(todo.id)} /> : null,
    );
    return (
      <ul className="collection">
        {todoList}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onClick: PropTypes.func.isRequired,
};
