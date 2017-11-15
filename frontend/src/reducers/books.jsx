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
  let newState = state;
  switch (action.type) {
  case RECEIVE_BOOK:
    if (action.data.books) {
      action.data.books.forEach((value) => {
        newState = newState.mergeIn([value.id], fromJS(value));
      });
    }
    if (action.data.nodes) {
      action.data.nodes.forEach((value, nodeId) => {
        newState = newState.mergeIn([value.bookId, 'nodes', nodeId], fromJS(value));
        if (value.parentId) {
          newState = newState.updateIn([value.bookId, 'nodes', value.parentId, 'childrenIds'], (list = List()) => list.push(nodeId));
        }
      });
    }
    return newState;
  default:
    return state;
  }
};

export const getBook = (state, bookId) => state.books.get(bookId);
export const getNode = (state, bookId, nodeId) => {
  if (!state.books.has(bookId)) return undefined;
  return state.books.get(bookId).nodes.get(nodeId);
};
