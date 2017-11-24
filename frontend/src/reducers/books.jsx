import { Map, List, fromJS, getIn } from 'immutable';

import { RECEIVE_BOOK, LIKE_CHAPTER } from 'constants/book';

/*
state.books:{
  bookId:{
    name:string, coverImage:string, description:string, rootId:number, likeSum:number
    chapters:{
      chapterId:{
        bookId:number, userId:number, createDate:date, parentId:number, likeSum:number, images:[string], childrenIds:[number]
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
      });
      action.data.chapters.forEach((value) => {
        if (value.parentId !== 0 && value.parentId !== null) {
          newState = newState.updateIn([value.bookId, 'chapters', value.parentId, 'childrenIds'], (list = List()) => list.push(value.id));
        }
      });
    }
    return newState;
  case LIKE_CHAPTER:
    if (action.data.chapterId && action.data.toggle) {
      newState.keySeq().forEach((key) => {
        if (getIn(newState, [key, 'chapters', action.data.chapterId, 'isliked']) !== 'undefined') {
          newState = newState.setIn([key, 'chapters', action.data.chapterId, 'isliked'], action.data.toggle);
        }
      });
    }
    return newState;
  default:
    return state;
  }
};

export const getBook = (state, bookId) => getIn(state, ['books', bookId]);
export const getChapter = (state, bookId, chapterId) => getIn(state, ['books', bookId, 'chapters', chapterId]);
