// import db from '../db';
const sampleData = {
  books: [
    {
      id: 1,
      title: 'mybook',
      coverUrl: 'coverurl123',
      description: 'describe my book',
      rootId: 2,
      likeNum: 2,
    },
  ],
  nodes: [
    {
      id: 1,
      bookId: 1,
      userId: 1,
      createDate: 123456,
      parentId: null,
      likeNum: 10,
      images: ['abc', 'aaa'],
    },
    {
      id: 2,
      bookId: 1,
      userId: 2,
      createDate: 123457,
      parentId: 1,
      likeNum: 0,
      images: ['b', 'bb'],
    },
  ],
};

export const getBook = async (req, res) => {
  res.json(sampleData);
};
