import { Map, List, fromJS, getIn } from 'immutable';

import { RECEIVE_BOOK } from 'constants/book';

/*
state.books:{
  bookId:{
    name:string, coverImage:string, description:string, rootChapterId:number, likeSum:number
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
  default:
    return state;
  }
};

export const getBook = (state, bookId) => getIn(state, ['books', bookId]);

export const getChapter = (state, bookId, chapterId) => getIn(state, ['books', bookId, 'chapters', chapterId]);

export const traverseToRoot = (state, bookId, chapterId) => {
  const book = getBook(state, bookId);
  if (book === undefined) return [];
  let chapter = getIn(book, ['chapters', chapterId]);
  let chapterIds = [];
  while (chapter !== undefined && chapter.get('parentId') !== 0) {
    chapter = getIn(book, ['chapters', chapter.get('parentId')]);
    if (chapter === undefined) break;
    chapterIds = [chapter.get('id'), ...chapterIds];
  }
  if (chapter === undefined) return [];
  return chapterIds;
};

export const traverseToLeaf = (state, bookId, chapterId) => {
  const book = getBook(state, bookId);
  if (book === undefined) return [];
  let chapter = getIn(book, ['chapters', chapterId]);
  let chapterIds = [];
  while (chapter !== undefined && chapter.get('childrenIds') !== undefined) {
    chapter = getIn(book, ['chapters', getIn(chapter, ['childrenIds', 0])]);
    if (chapter === undefined) break;
    chapterIds = [...chapterIds, chapter.get('id')];
  }
  if (chapter === undefined) return [];
  return chapterIds;
};

export const getChapterChain = (state, bookId, chapterId) => {
  const chapter = getChapter(state, bookId, chapterId);
  if (chapter === undefined) return [];
  return traverseToRoot(state, bookId, chapterId).concat(chapter, traverseToLeaf(state, bookId, chapterId));
};
