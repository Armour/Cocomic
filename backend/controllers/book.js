import db from '../db';

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
  try {
    const { bookId } = req.params;
    const { books } = await db.query('SELECT * FROM book WHERE id=($1)', [bookId]);
    if (books.length === 0) Error();
    const book = books[0];
    const nodeQuery = 'SELECT * FROM node WHERE id=($1) OR book_id=($2) AND parent_id=($3)';
    const { nodes } = await db.query(nodeQuery, [book.rootId, bookId, book.rootId]);
    res.json({ books: [book], nodes });
  } catch (e) {
    res.status(404).send('data not found');
  }

  res.json(sampleData);
};
