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
    res.json({ books });
  } catch (e) {
    res.status(404).send('data not found');
  }
};
