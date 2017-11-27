import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { books } from 'reducers/books';
import { register } from 'reducers/user';
import { images } from 'reducers/uploadImage';
import { popularBooks } from 'reducers/popularBooks';
import { newestBooks } from 'reducers/newestBooks';
import { userCollections } from 'reducers/userCollections';
import { userFavorates } from 'reducers/userFavorates';

export default combineReducers({
  books,
  popularBooks,
  newestBooks,
  register,
  fetchingData,
  images,
  userCollections,
  userFavorates,
});
