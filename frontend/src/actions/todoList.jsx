import { ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO } from 'constants/actionTypes';

import { v1 } from 'node-uuid';

export const addTodo = text => ({
  type: ADD_TODO,
  id: v1(),
  text,
  completed: false,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});
