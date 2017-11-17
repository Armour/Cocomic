import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { books } from 'reducers/books';
import { register } from 'reducers/user';

export default combineReducers({
  books,
  register,
  fetchingData,
});
