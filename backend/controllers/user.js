import db from '../db';

export const register = async (req, res) => {
  if (typeof req.body.username === 'undefined' || typeof req.body.username !== 'string') {
    return res.status(500).json({ error: 'username undefined or wrong type' });
  }
  if (typeof req.body.email === 'undefined' || typeof req.body.email !== 'string') {
    return res.status(500).json({ error: 'email undefined or wrong type' });
  }
  if (typeof req.body.password === 'undefined' || typeof req.body.password !== 'string') {
    return res.status(500).json({ error: 'password undefined or wrong type' });
  }
  try {
    const { rows } = await db.query('INSERT INTO userinfo(username, email, password, create_date) VALUES($1, $2, $3, to_timestamp($4/1000.0)) RETURNING username',
      [req.body.username, req.body.email, req.body.password, Date.now()]);
    return res.json({
      code: 0,
      message: 'success',
      username: rows[0].username,
    });
  } catch (e) {
    return res.status(500).json({ error: 'user insertion error' });
  }
};

