import { Map, getIn } from 'immutable';

import { RECEIVE_IMAGE } from 'constants/uploadImage';

/*
state.getImages:{
  imageHash: imageData
}
*/

const initialState = Map();

export const getImages = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_IMAGE:
    if (action.data.images) {
      action.data.images.forEach((value) => {
        newState = newState.set(value.imageHash, value.imageData);
      });
    }
    return newState;
  default:
    return state;
  }
};

export const getImage = (state, imageHash) => getIn(state, ['getImages', imageHash], '');
