import { METHOD_POST, fetchDataIfNeeded } from 'actions/fetchApi';
import { RECEIVE_IMAGE } from 'constants/image';

const receiveImage = data => ({
  type: RECEIVE_IMAGE,
  data,
});

export const fetchImageIfNeeded = data =>
  (dispatch) => {
    const url = `/image/getImages?imageHash=${data.images[0]}`;
    dispatch(fetchDataIfNeeded(url, METHOD_POST, data, receiveImage));
  };
