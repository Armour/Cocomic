import db from '../db';

export const getChapter = async (req, res) => {
  try {
    const { bookId, chapterId } = req.params;
    const chapterQuery = `
    SELECT id, title, user_id as "userId", book_id as "bookId", parent_id as "parentId",
    like_sum as "likeSum", images, create_date as "createDate", title, description, depth
    FROM chapter WHERE id=($1) OR book_id=($2) AND parent_id=($3)
    `;
    const { rows: chapters } = await db.query(chapterQuery, [chapterId, bookId, chapterId]);
    res.json({ chapters });
  } catch (e) {
    res.status(404).send('data not found');
  }
};
