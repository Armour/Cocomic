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
    const book = books[0];
    const chapterQuery = `
    SELECT id, user_id as "userId", book_id as "bookId", parent_id as "parentId",
    like_sum as "likeSum", images, create_date as "createDate"
    FROM chapter WHERE id=($1) OR book_id=($2) AND parent_id=($3)
    `;
    const { rows: chapters } = await db.query(chapterQuery, [book.rootChapterId, bookId, book.rootChapterId]);
    res.json({ books, chapters });
  } catch (e) {
    res.status(404).send('data not found');
  }
};
