import db from '../db';

export const updateLike = async (req, res) => {
  try {
    const { bookId, chapterId } = req.params;
    const queryChapter = `
    UPDATE chapter
    SET like_sum = like_sum + 1
    WHERE id=($1)
    `;
    const queryBook = `
    UPDATE book
    SET like_sum = like_sum + 1
    WHERE id=($1)
    `;
    await db.query(queryChapter, [chapterId]);
    await db.query(queryBook, [bookId]);
    res.status(204).end();
  } catch (e) {
    res.status(404).send('data not found');
  }
};
