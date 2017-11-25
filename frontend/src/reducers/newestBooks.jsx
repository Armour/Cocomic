import { List, fromJS } from 'immutable';

import { CLEAR_GALLERY_BOOKS, RECEIVE_NEWEST_BOOKS } from 'constants/book';

/*
state.newestBooks:{
  bookId:{
    name:string, coverImage:string, description:string, rootId:number, likeSum:number user_id:number
  }
}
*/

const initialState = List();

export const newestBooks = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_NEWEST_BOOKS:
    if (action.data.books) {
      action.data.books.forEach((value) => {
        newState = newState.push(fromJS(value));
      });
    }
    return newState;
  case CLEAR_GALLERY_BOOKS:
    return List();
  default:
    return state;
  }
};
