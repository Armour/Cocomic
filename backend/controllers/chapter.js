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

    if (typeof req.body.bookId === 'undefined') {
      return res.status(500).json({ message: 'book id undefined' });
    }

    if (typeof req.session === 'undefined' || typeof req.session.uid === 'undefined') {
      return res.status(500).json({ message: 'session or session.uid undefined' });
    }

    const chapterId = parseInt(req.body.chapterId, 10);
    const bookId = parseInt(req.body.bookId, 10);
    const toggleQuery = req.body.toggle ? 'INSERT INTO likeinfo(user_id, chapter_id, book_id) VALUES($1, $2, $3)' : 'DELETE FROM likeinfo WHERE user_id = $1 AND chapter_id = $2 AND book_id = $3';
    await db.query(toggleQuery, [req.session.uid, chapterId, bookId]);
    return res.status(200).json({
      code: 0,
      message: 'success',
      chapterId,
      bookId,
      toggle: req.body.toggle,
    });
  } catch (e) {
    return res.status(500).json({ message: `like toggle failed: ${e.message} ` });
  }
};

export const updateBookmark = async (req, res) => {
  try {
    if (req.body.bookmark !== true && req.body.bookmark !== false) {
      return res.status(500).json({ message: 'bookmark undefined' });
    }

    if (typeof req.body.chapterId === 'undefined') {
      return res.status(500).json({ message: 'chapter id undefined' });
    }

    if (typeof req.body.bookId === 'undefined') {
      return res.status(500).json({ message: 'book id undefined' });
    }

    if (typeof req.session === 'undefined' || typeof req.session.uid === 'undefined') {
      return res.status(500).json({ message: 'session or session.uid undefined' });
    }

    const chapterId = parseInt(req.body.chapterId, 10);
    const bookId = parseInt(req.body.bookId, 10);
    const bookmarkQuery = req.body.bookmark ? 'INSERT INTO bookmarkinfo(user_id, book_id, chapter_id) VALUES($1, $2, $3)' : 'DELETE FROM bookmarkinfo WHERE user_id = $1 AND book_id = $2 AND chapter_id = $3';
    await db.query(bookmarkQuery, [req.session.uid, bookId, chapterId]);
    return res.status(200).json({
      code: 0,
      message: 'success',
      chapterId,
      bookId,
      bookmark: req.body.bookmark,
    });
  } catch (e) {
    return res.status(500).json({ message: `bookmark failed: ${e.message} ` });
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
    if (chapterImages === undefined || chapterImages.length === 0) {
      throw Error('Should have at least one image for new chapter');
    }
    const chapterQueryValues = [userId, bookId, title, description, parentId, chapterImages];
    const { rows } = await db.query(chapterQuery, chapterQueryValues);
    if (rows !== undefined && rows.length !== 0) {
      return res.json({ chapterId: rows[0].id, images: chapterImages });
    }
    throw Error('insert failed');
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
