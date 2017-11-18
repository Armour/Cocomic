import { RECEIVE_IMAGE } from 'constants/UploadImage';

const newImage = data => ({
  type: RECEIVE_IMAGE,
  data,
});

export const imageInsert = data =>
  (dispatch) => {
    dispatch(newImage(data));
  };
