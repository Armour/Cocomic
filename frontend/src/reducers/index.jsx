import { combineReducers } from 'redux';
import { fetchingData } from 'reducers/fetchingData';
import { getImages } from 'reducers/getImage';
import { books } from 'reducers/books';
import { register } from 'reducers/user';
import { uploadImages } from 'reducers/uploadImage';
import { popularBooks } from 'reducers/popularBooks';
import { newestBooks } from 'reducers/newestBooks';
import { userCollections } from 'reducers/userCollections';
import { userFavorates } from 'reducers/userFavorates';
import { bookCover } from 'reducers/uploadBook';

export default combineReducers({
  books,
  popularBooks,
  newestBooks,
  getImages,
  register,
  fetchingData,
  uploadImages,
  userCollections,
  userFavorates,
  bookCover,
});
