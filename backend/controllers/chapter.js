import db from '../db';

export const getChapter = async (req, res) => {
  try {
    const { bookId, chapterId } = req.params;
    const query = `
    SELECT id, title, user_id as "userId", book_id as "bookId", parent_id as "parentId",
    like_sum as "likeSum", images, create_date as "createDate", title, description, depth
    FROM chapter WHERE id=($1) OR book_id=($2) AND parent_id=($3)
    `;
    const { rows: chapters } = await db.query(query, [chapterId, bookId, chapterId]);
    if (chapters === undefined || chapters.length === 0) Error();
    res.json({ chapters });
  } catch (e) {
    res.status(404).send('data not found');
  }
};

export const updateLike = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const query = `
    UPDATE chapter
    SET like_sum = like_sum + 1
    WHERE id=($1)
    `;
    // const { result } = await db.query(query, [chapterId]);
    // console.error(result);
    await db.query(query, [chapterId]);
    res.status(204);
  } catch (e) {
    res.status(404).send('data not found');
  }
};
