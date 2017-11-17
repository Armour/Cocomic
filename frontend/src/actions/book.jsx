import { fetchDataIfNeeded } from 'actions/fetchApi';
import { RECEIVE_BOOK } from 'constants/book';

/*
data:{
  books:[
    {
      id:number, name:string, coverUrl:string, description:string, rootId:number, likeNum:number
    }
  ],
  nodes:[
    {
      id:number, bookId:number, userId:number, createDate:date, parentId:number, likeNum:number, images:[string]
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
    dispatch(fetchDataIfNeeded(url, {}, receiveBook));
  };

export const fetchChapterIfNeeded = chapterId =>
  (dispatch) => {
    const url = `/chapter/${chapterId}`;
    dispatch(fetchDataIfNeeded(url, {}, receiveBook));
  };
