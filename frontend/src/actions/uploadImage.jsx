import { RECEIVE_IMAGE, UPLOAD_IMAGE, REMOVE_IMAGE, UPLOAD_DESCRIPTION, UPLOAD_TITLE, EDIT_IMAGE } from 'constants/uploadImage';
import { METHOD_POST, fetchDataIfNeeded } from 'actions/fetchApi';

const newImage = data => ({
  type: RECEIVE_IMAGE,
  data,
});

const removeImage = data => ({
  type: REMOVE_IMAGE,
  data,
});

const uploadImage = uploadedData => data => ({
  type: UPLOAD_IMAGE,
  data,
  uploadedData,
});

const editImage = bookId => data => ({
  type: EDIT_IMAGE,
  data,
  bookId,
});

const description = data => ({
  type: UPLOAD_DESCRIPTION,
  data,
});

const title = data => ({
  type: UPLOAD_TITLE,
  data,
});

export const imageInsert = data =>
  (dispatch) => {
    dispatch(newImage(data));
  };

export const imageRemove = imgId =>
  (dispatch) => {
    dispatch(removeImage(imgId));
  };

export const imageUpload = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/book/addChapter', METHOD_POST, data, uploadImage(data)));
  };

export const editUpload = (data, bookId) =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/book/editChapter', METHOD_POST, data, editImage(bookId)));
  };

export const descriptionUpload = data =>
  (dispatch) => {
    dispatch(description(data));
  };

export const titleUpload = data =>
  (dispatch) => {
    dispatch(title(data));
  };

