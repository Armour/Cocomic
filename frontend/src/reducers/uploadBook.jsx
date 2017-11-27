import { Map, fromJS } from 'immutable';
import { NEW_BOOK_COVER, UPLOAD_BOOK } from 'constants/uploadBook';

const initialState = Map();

export const bookCover = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case NEW_BOOK_COVER:
    if (action.data.file && action.data.coverPreviewUrl) {
      newState = newState.set('bookCover', fromJS(action.data));
    }
    return newState;
  case UPLOAD_BOOK:
    return newState;
  default:
    return state;
  }
};
