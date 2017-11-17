import { connect } from 'react-redux';

import { toggleTodo } from 'actions';
import { VisibilityFiltersOptions } from 'constants';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
  case VisibilityFiltersOptions.SHOW_ALL:
    return todos;
  case VisibilityFiltersOptions.SHOW_COMPLETED:
    return todos.filter(t => t !== undefined && t.completed).toList();
  case VisibilityFiltersOptions.SHOW_ACTIVE:
    return todos.filter(t => t !== undefined && !t.completed).toList();
  default:
    return todos;
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
  onClick: (id) => {
    dispatch(toggleTodo(id));
  },
});

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(/* Component name here */);
