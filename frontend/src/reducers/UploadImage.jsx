import { Map, fromJS } from 'immutable';
import { RECEIVE_IMAGE } from 'constants/UploadImage';


const initialState = Map();

export const images = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_IMAGE:
    if (action.data.file && action.data.imagePreviewUrl) {
      newState = newState.mergeIn([action.data.id], fromJS(action.data));
    }
    return newState;
  default:
    return state;
  }
};

