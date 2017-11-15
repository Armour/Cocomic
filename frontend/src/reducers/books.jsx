import { Map, List, fromJS } from 'immutable';

import { RECEIVE_BOOK } from 'constants/book';

/*
state.books:{
  bookId:{
    name:string, coverUrl:string, description:string, rootId:number, likeNum:number
    chapters:{
      chapterId:{
        bookId:number, userId:number, createDate:date, parentId:number, likeNum:number, images:[string], childrenIds:[number]
      }
    }
  }
}
*/

const initialState = Map();

export const books = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_BOOK:
    if (action.data.books) {
      action.data.books.forEach((value) => {
        newState = newState.mergeIn([value.id], fromJS(value));
      });
    }
    if (action.data.chapters) {
      action.data.chapters.forEach((value) => {
        newState = newState.mergeIn([value.bookId, 'chapters', value.id], fromJS(value));
        if (value.parentId) {
          newState = newState.updateIn([value.bookId, 'chapters', value.parentId, 'childrenIds'], (list = List()) => list.push(value.id));
        }
      });
    }
    return newState;
  default:
    return state;
  }
};

export const getBook = (state, bookId) => state.books.get(bookId);
export const getchapter = (state, bookId, chapterId) => {
  if (!state.books.has(bookId)) return undefined;
  return state.books.get(bookId).chapters.get(chapterId);
};
