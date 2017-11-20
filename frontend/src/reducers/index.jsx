import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { books } from 'reducers/books';
import { register } from 'reducers/user';
import { images } from 'reducers/UploadImage';

export default combineReducers({
  books,
  register,
  fetchingData,
  images,
});
