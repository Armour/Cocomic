import db from '../db';
import { uploadImages } from './image';

export const updateLike = async (req, res) => {
  try {
    if (req.body.toggle !== true && req.body.toggle !== false) {
      return res.status(500).json({ message: 'toggle undefined' });
    }
    if (typeof req.body.chapterId === 'undefined') {
      return res.status(500).json({ message: 'chapter id undefined' });
    }

    if (typeof req.session === 'undefined' || typeof req.session.uid === 'undefined') {
      return res.status(500).json({ message: 'session or session.uid undefined' });
    }

    const chapterId = parseInt(req.body.chapterId, 10);
    const toggleQuery = req.body.toggle ? 'INSERT INTO likeinfo(user_id, chapter_id) VALUES($1, $2)' : 'DELETE FROM likeinfo WHERE user_id = $1 AND chapter_id = $2';
    await db.query(toggleQuery, [req.session.uid, chapterId]);
    return res.status(200).json({
      code: 0,
      message: 'success',
      chapterId,
      toggle: req.body.toggle ? '1' : '0',
    });
  } catch (e) {
    return res.status(500).json({ message: `like toggle failed: ${e.message} ` });
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
