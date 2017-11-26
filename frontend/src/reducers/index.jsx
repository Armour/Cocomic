import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { books } from 'reducers/books';
import { register } from 'reducers/user';
import { images } from 'reducers/uploadImage';
import { popularBooks } from 'reducers/popularBooks';
import { newestBooks } from 'reducers/newestBooks';
import { bookCover } from 'reducers/uploadBook';

export default combineReducers({
  books,
  popularBooks,
  newestBooks,
  register,
  fetchingData,
  images,
  bookCover,
});
