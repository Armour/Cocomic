import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { books } from 'reducers/books';

export default combineReducers({
  books,
  fetchingData,
});
