import { List, fromJS } from 'immutable';

import { RECEIVE_USER_COLLECTIONS } from 'constants/book';

/*
state.popular_books:{
  bookId:{
    name:string, coverImage:string, description:string, rootId:number, likeSum:number user_id:number
  }
}
*/

const initialState = List();

export const userCollections = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_USER_COLLECTIONS:
    if (action.data !== undefined && action.data.books !== undefined) {
      newState = List(fromJS(action.data.books));
    }
    return newState;
  default:
    return state;
  }
};
