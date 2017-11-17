import db from '../db';

// const sampleData = {
//   books: [
//     {
//       id: 1,
//       title: 'mybook',
//       coverUrl: 'coverurl123',
//       description: 'describe my book',
//       rootId: 2,
//       likeNum: 2,
//     },
//   ],
//   chapters: [
//     {
//       id: 1,
//       bookId: 1,
//       userId: 1,
//       createDate: 123456,
//       parentId: null,
//       likeNum: 10,
//       images: ['sample-1', 'sample-1'],
//     },
//     {
//       id: 2,
//       bookId: 1,
//       userId: 2,
//       createDate: 123457,
//       parentId: 1,
//       likeNum: 0,
//       images: ['sample-1', 'sample-1'],
//     },
//   ],
// };

export const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookQuery = `
    SELECT id, title, cover_image as "coverImage", description, root_chapter_id as "rootChapterId"
    FROM book WHERE id=($1)
    `;
    const { rows: books } = await db.query(bookQuery, [bookId]);
    if (books === undefined || books.length === 0) Error();
    res.json({ books });
  } catch (e) {
    res.status(404).send('data not found');
  }
};
