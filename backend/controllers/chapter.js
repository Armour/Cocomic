import db from '../db';

export const updateLike = async (req, res) => {
  try {
    if (req.params.toggle !== 'true' && req.params.toggle !== 'false') {
      return res.status(500).json({ message: 'toggle undefined' });
    }
    if (typeof req.params.chapterId === 'undefined') {
      return res.status(500).json({ message: 'chapter id undefined' });
    }

    if (typeof req.session === 'undefined' || typeof req.session.uid === 'undefined') {
      return res.status(500).json({ message: 'session or session.uid undefined' });
    }

    const chapterId = parseInt(req.params.chapterId, 10);
    const toggleQuery = req.params.toggle === 'true' ? 'INSERT INTO likeinfo(user_id, chapter_id) VALUES($1, $2)' : 'DELETE FROM likeinfo WHERE user_id = $1 AND chapter_id = $2';
    await db.query(toggleQuery, [req.session.uid, chapterId]);
    return res.status(200).json({
      code: 0,
      message: 'success',
      chapterId,
      toggle: req.params.toggle === 'true' ? '1' : '0',
    });
  } catch (e) {
    return res.status(500).json({ message: `like toggle failed: ${e.message} ` });
  }
};
