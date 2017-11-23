import db from '../db';
import { uploadImages } from './image';

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
    res.status(404).json({ message: 'chapter not found' });
  }
};

export const addChapter = async (req, res) => {
  try {
    const {
      title,
      description,
      parentId,
      bookId,
      images,
    } = req.body;
    const { uid: userId } = req.session;
    const chapterImages = uploadImages(images);
    const chapterQuery = `
    INSERT INTO chapter(user_id, book_id, title, description, parent_id, images)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    const chapterQueryValues = [userId, bookId, title, description, parentId, chapterImages];
    const { id: chapterId } = await db.query(chapterQuery, chapterQueryValues);
    res.json({ chapterId });
  } catch (e) {
    res.status(404).json({ message: 'book not found' });
  }
};
