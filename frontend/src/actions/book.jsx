import { METHOD_GET, METHOD_POST, fetchDataIfNeeded } from 'actions/fetchApi';
import { RECEIVE_BOOK, CLEAR_GALLERY_BOOKS, RECEIVE_POPULAR_BOOKS, RECEIVE_NEWEST_BOOKS, LIKE_CHAPTER } from 'constants/book';

/*
data:{
  books:[
    {
      id:number, title:string, coverImage:string, description:string, rootChapterId:number, likeSum:number
    }
  ],
  chapters:[
    {
      id:number, bookId:number, userId:number, createDate:date, parentId:number, likeSum:number, images:[string]
    }
  ]
}
*/

const receiveBook = data => ({
  type: RECEIVE_BOOK,
  data,
});

const likeSuccess = data => ({
  type: LIKE_CHAPTER,
  data,
});

export const clearGalleryBooks = () => ({
  type: CLEAR_GALLERY_BOOKS,
});

const receivePopularBooks = data => ({
  type: RECEIVE_POPULAR_BOOKS,
  data,
});

const receiveNewestBooks = data => ({
  type: RECEIVE_NEWEST_BOOKS,
  data,
});

export const fetchPopularBooks = (offset, amount) =>
  (dispatch) => {
    const url = `/book/popular/${offset}/${amount}`;
    dispatch(fetchDataIfNeeded(url, METHOD_GET, {}, receivePopularBooks));
  };

export const fetchNewestBooks = (offset, amount) =>
  (dispatch) => {
    const url = `/book/newest/${offset}/${amount}`;
    dispatch(fetchDataIfNeeded(url, METHOD_GET, {}, receiveNewestBooks));
  };

export const fetchBookIfNeeded = bookId =>
  (dispatch) => {
    const url = `/book/${bookId}`;
    dispatch(fetchDataIfNeeded(url, METHOD_GET, {}, receiveBook));
  };

export const fetchChapterIfNeeded = (bookId, chapterId) =>
  (dispatch) => {
    const url = `/book/${bookId}/${chapterId}`;
    if (chapterId > 0) {
      dispatch(fetchDataIfNeeded(url, METHOD_GET, {}, receiveBook));
    }
  };

// TODO: user should know whether they already like this chapter
export const likeChapter = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/book/like', METHOD_POST, data, likeSuccess));
  };
