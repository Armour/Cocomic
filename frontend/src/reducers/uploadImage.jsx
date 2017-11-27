import { Map, fromJS } from 'immutable';
import { RECEIVE_IMAGE, UPLOAD_IMAGE, REMOVE_IMAGE, UPLOAD_DESCRIPTION, UPLOAD_TITLE } from 'constants/uploadImage';


const initialState = Map();

export const uploadImages = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_IMAGE:
    if (action.data.file && action.data.imagePreviewUrl) {
      newState = newState.mergeIn([action.data.id], fromJS(action.data));
    }
    return newState;
  case UPLOAD_IMAGE:
    return newState;
  case REMOVE_IMAGE:
    newState = newState.delete(action.data);
    return newState;
  case UPLOAD_DESCRIPTION:
    if (action.data.description) {
      newState = newState.set('description', action.data.description);
    }
    return newState;
  case UPLOAD_TITLE:
    if (action.data.title) {
      newState = newState.set('title', action.data.title);
    }
    return newState;
  default:
    return state;
  }
};

