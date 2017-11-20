import { METHOD_GET, METHOD_PUT, fetchDataIfNeeded } from 'actions/fetchApi';
import { RECEIVE_BOOK, LIKE_CHAPTER } from 'constants/book';

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

const likeSuccess = () => ({
  type: LIKE_CHAPTER,
});

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
export const likeChapter = (bookId, chapterId) =>
  (dispatch) => {
    const url = `/book/${bookId}/${chapterId}/like`;
    dispatch(fetchDataIfNeeded(url, METHOD_PUT, {}, likeSuccess));
  };
