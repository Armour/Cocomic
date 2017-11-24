import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { books } from 'reducers/books';
import { register } from 'reducers/user';
import { images } from 'reducers/uploadImage';
import { popularBooks } from 'reducers/popularBooks';

export default combineReducers({
  books,
  popularBooks,
  register,
  fetchingData,
  images,
});
