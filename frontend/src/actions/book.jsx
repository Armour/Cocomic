import { fetchDataIfNeeded } from 'actions/fetchApi';
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
    dispatch(fetchDataIfNeeded(url, receiveBook));
  };

export const fetchChapterIfNeeded = chapterId =>
  (dispatch) => {
    const url = `/chapter/${chapterId}`;
    if (chapterId > 0) {
      dispatch(fetchDataIfNeeded(url, receiveBook));
    }
  };
