import { RECEIVE_BOOK } from 'constants';

/*
state.books:{
  bookId:{
    bookId:number, name:string, coverUrl:string, description:string, rootId:number, likeNum:number
    nodes:{
      nodeId:{
        nodeId:number, bookId:number, userId:number, createDate:date, parentId:number, likeNum:number, images:[string], childrenIds:[number]
      }
    }
  }
}
*/

const initialState = {};
const bookInitialState = { nodes: {} };
const nodeInitialState = { childrenIds: [] };

export const books = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_BOOK:
    const newState = { ...state };
    action.data.books.forEach((value, key) => {
      newState[key] = newState[key] || bookInitialState;
      newState[key] = { ...newState[key], ...value };
    });
    action.data.nodes.forEach((value, key) => {
      const { bookId } = value;
      const { nodes } = newState[bookId];
      nodes[key] = nodes[key] || nodeInitialState;
      nodes[key] = { ...nodes[key], ...value };
      const { parentId } = value;
      nodes[parentId] = nodes[parentId] || nodeInitialState;
      nodes[parentId].childrenIds.push(key);
    });
    return newState;
  default:
    return state;
  }
};

export const getBook = (state, bookId) => state.books[bookId];
export const getNode = (state, bookId, nodeId) => {
  if (!state.books.has(bookId)) return undefined;
  return state.books[bookId].nodes[nodeId];
};
