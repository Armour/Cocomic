import { NEW_BOOK_COVER, UPLOAD_BOOK } from 'constants/uploadBook';
import { METHOD_POST, fetchDataIfNeeded } from 'actions/fetchApi';

const newCover = data => ({
  type: NEW_BOOK_COVER,
  data,
});

const uploadBook = data => ({
  type: UPLOAD_BOOK,
  data,
});

export const newBookCover = data =>
  (dispatch) => {
    dispatch(newCover(data));
  };

export const bookUpload = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/bookUrl', METHOD_POST, data, uploadBook));
  };

