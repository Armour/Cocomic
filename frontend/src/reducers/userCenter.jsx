import { Map, List, fromJS } from 'immutable';

import { RECEIVE_USER_COLLECTIONS, TOGGLE_USER_CENTER_TAB, RECEIVE_FAVORATES } from 'constants/book';

/*
state.popular_books:{
  bookId:{
    name:string, coverImage:string, description:string, rootId:number, likeSum:number user_id:number
  }
}
*/

const initialState = Map({
  isCollection: true,
  books: List(),
});

export const userCenter = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_USER_COLLECTIONS:
  case RECEIVE_FAVORATES:
    if (action.data !== undefined && action.data.books !== undefined) {
      newState = newState.set('books', List(fromJS(action.data.books)));
    }
    return newState;
  case TOGGLE_USER_CENTER_TAB:
    newState = newState.update('isCollection', value => !value);
    return newState;
  default:
    return state;
  }
};
