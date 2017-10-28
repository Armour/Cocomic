import { connect } from 'react-redux';

import { addTodo } from 'actions';
import { TodoInput } from 'components/TodoInput';

const mapStateToProps = (/* state */) => ({
  // ...
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (inputValue) => {
    dispatch(addTodo(inputValue));
  },
});

export const AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoInput);
