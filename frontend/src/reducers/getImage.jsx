import { List, fromJS, getIn } from 'immutable';

import { RECEIVE_IMAGE } from 'constants/uploadImage';

/*
state.getImages:{
  imageHash:{
    dataUrl: string
  }
}
*/

const initialState = List();

export const getImages = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_IMAGE:
    if (action.data.images) {
      action.data.images.forEach((value) => {
        newState = newState.push(fromJS(value));
      });
    }
    return newState;
  default:
    return state;
  }
};

export const getImage = (state, imageHash) => getIn(state, ['getImages', imageHash], '');
