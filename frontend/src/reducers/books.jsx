import { Map, List, fromJS } from 'immutable';

import { RECEIVE_BOOK } from 'constants/book';

/*
state.books:{
  bookId:{
    name:string, coverUrl:string, description:string, rootId:number, likeNum:number
    nodes:{
      nodeId:{
        bookId:number, userId:number, createDate:date, parentId:number, likeNum:number, images:[string], childrenIds:[number]
      }
    }
  }
}
*/

const initialState = Map();

export const books = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_BOOK:
    action.data.books.forEach((value, bookId) => {
      state.mergeIn([bookId], fromJS(value));
    });
    action.data.nodes.forEach((value, nodeId) => {
      state.mergeIn([value.bookId, 'nodes', nodeId], fromJS(value));
      state.updateIn([value.bookId, 'nodes', value.parentId, 'childrenIds'], (list = List()) => list.push(nodeId));
    });
    return state;
  default:
    return state;
  }
};

export const getBook = (state, bookId) => state.books.get(bookId);
export const getNode = (state, bookId, nodeId) => {
  if (!state.books.has(bookId)) return undefined;
  return state.books.get(bookId).nodes.get(nodeId);
};
