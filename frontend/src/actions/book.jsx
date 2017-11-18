import { METHOD_GET, fetchDataIfNeeded } from 'actions/fetchApi';
import { RECEIVE_BOOK } from 'constants/book';

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
