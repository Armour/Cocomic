import { List, fromJS } from 'immutable';

import { RECEIVE_POPULAR_BOOKS } from 'constants/book';

/*
state.popular_books:{
  bookId:{
    name:string, coverImage:string, description:string, rootId:number, likeSum:number user_id:number
  }
}
*/

const initialState = List();

export const popularBooks = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_POPULAR_BOOKS:
    if (action.data.books) {
      action.data.books.forEach((value) => {
        newState = newState.push(fromJS(value));
      });
    }
    return newState;
  default:
    return state;
  }
};
