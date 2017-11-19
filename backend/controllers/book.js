import db from '../db';

export const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookQuery = `
    SELECT id, title, cover_image as "coverImage", description, root_chapter_id as "rootChapterId"
    FROM book WHERE id=($1)
    `;
    const { rows: books } = await db.query(bookQuery, [bookId]);
    if (books === undefined || books.length === 0) Error();

    const chapterQuery = `
    SELECT id, title, user_id as "userId", book_id as "bookId", parent_id as "parentId",
    like_sum as "likeSum", images, create_date as "createDate", title, description, depth
    FROM chapter WHERE book_id=($1)
    `;
    const { rows: chapters } = await db.query(chapterQuery, [bookId]);
    res.json({ books, chapters });
  } catch (e) {
    res.status(404).send('data not found');
  }
};
