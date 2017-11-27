import { RECEIVE_IMAGE, UPLOAD_IMAGE, REMOVE_IMAGE, UPLOAD_DESCRIPTION } from 'constants/uploadImage';
import { METHOD_POST, fetchDataIfNeeded } from 'actions/fetchApi';

const newImage = data => ({
  type: RECEIVE_IMAGE,
  data,
});

const removeImage = data => ({
  type: REMOVE_IMAGE,
  data,
});

const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  data,
});

const description = data => ({
  type: UPLOAD_DESCRIPTION,
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
    dispatch(fetchDataIfNeeded('/book/addChapter', METHOD_POST, data, uploadImage));
  };

export const descriptionUpload = data =>
  (dispatch) => {
    dispatch(description(data));
  };

