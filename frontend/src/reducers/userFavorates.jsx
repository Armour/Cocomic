import { List, fromJS } from 'immutable';

import { RECEIVE_FAVORATES } from 'constants/book';

/*
state.popular_books:{
  bookId:{
    name:string, coverImage:string, description:string, rootId:number, likeSum:number user_id:number
  }
}
*/

const initialState = List();

export const userFavorates = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_FAVORATES:
    if (action.data.books) {
      action.data.books.forEach((value) => {
        newState = newState.push(fromJS(value));
      });
    }
    return newState;
  // case CLEAR_GALLERY_BOOKS:
  //   return List();
  default:
    return state;
  }
};
