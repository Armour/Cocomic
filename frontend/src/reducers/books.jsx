import { Map, List, fromJS, getIn } from 'immutable';

import { RECEIVE_BOOK, LIKE_CHAPTER, RECEIVE_BOOKMARK } from 'constants/book';
import { UPLOAD_IMAGE } from 'constants/uploadImage';

/*
state.books:{
  bookId:{
    name:string, coverImage:string, description:string, rootChapterId:number, likeSum:number, uploadedChapterId:number
    chapters:{
      chapterId:{
        bookId:number, userId:number, createDate:date, parentId:number, likeSum:number, images:[string], childrenIds:[number],
        title: string, description: string,
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
          newState = newState.updateIn([value.bookId, 'chapters', value.parentId, 'childrenIds'], (list = List()) => {
            let index = value.likeSum ? list.findIndex(chapterId => getIn(newState, [value.bookId, 'chapters', chapterId, 'likeSum']) < value.likeSum) : 0;
            if (index === -1) index = list.size;
            return list.insert(index, value.id);
          });
        }
      });
    }
    return newState;
  case LIKE_CHAPTER:
    if (action.data && action.data.bookId && action.data.chapterId && action.data.toggle !== undefined) {
      newState = newState.setIn([action.data.bookId, 'chapters', action.data.chapterId, 'isliked'], action.data.toggle);
    }
    return newState;
  case RECEIVE_BOOKMARK:
    if (action.data && action.data.bookId && action.data.chapterId && action.data.bookmark !== undefined) {
      newState = newState.setIn([action.data.bookId, 'chapters', action.data.chapterId, 'isbookmarked'], action.data.bookmark);
    }
    return newState;
  case UPLOAD_IMAGE:
    if (action.data.chapterId) {
      const chapter = {
        id: action.data.chapterId,
        ...action.uploadedData,
        images: action.data.images,
        isliked: false,
        isbookmarked: false,
      };
      newState = newState.mergeIn([chapter.bookId, 'chapters', chapter.id], fromJS(chapter));
      newState = newState.setIn([chapter.bookId, 'uploadedChapterId'], chapter.id);
      newState = newState.updateIn([chapter.bookId, 'chapters', chapter.parentId, 'childrenIds'], (list = List()) => list.unshift(chapter.id));
    }
    return newState;
  default:
    return state;
  }
};

export const getBook = (state, bookId) => getIn(state, ['books', bookId]);

export const getChapter = (book, chapterId) => getIn(book, ['chapters', chapterId]);

export const traverseToRoot = (book, chapterId) => {
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

export const traverseToLeaf = (book, chapterId) => {
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
