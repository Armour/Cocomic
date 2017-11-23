import db from '../db';

export const register = async (req, res) => {
  if (typeof req.body.username === 'undefined' || typeof req.body.username !== 'string') {
    return res.status(500).json({ message: 'username undefined or wrong type' });
  }
  if (typeof req.body.email === 'undefined' || typeof req.body.email !== 'string') {
    return res.status(500).json({ message: 'email undefined or wrong type' });
  }
  if (typeof req.body.password === 'undefined' || typeof req.body.password !== 'string') {
    return res.status(500).json({ message: 'password undefined or wrong type' });
  }
  try {
    await db.query('INSERT INTO userinfo(username, email, password, create_date) VALUES($1, $2, $3, to_timestamp($4/1000.0)) RETURNING *',
      [req.body.username, req.body.email, req.body.password, Date.now()]);
    if (typeof req.session === 'undefined') {
      return res.status(500).json({ message: 'session undefined' });
    }
    return res.json({
      code: 0,
      message: 'success',
    });
  } catch (e) {
    return res.status(500).json({ message: 'user insertion error' });
  }
};

export const getUser = async (req, res) => {
  try {
    if (typeof req.session === 'undefined') {
      return res.json({
        code: 0,
        message: 'success',
        isLoggedIn: false,
      });
    }
    return res.json({
      code: 0,
      message: 'success',
      isLoggedIn: true,
      username: req.session.username,
    });
  } catch (e) {
    return res.status(500).json({ message: 'get user error' });
  }
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.json({
        code: 0,
        message: 'logout success',
      });
    }
    return res.json({
      code: 1,
      message: 'session destroy fails',
    });
  });
};

export const login = async (req, res) => {
  if (typeof req.body.email === 'undefined' || typeof req.body.email !== 'string') {
    return res.status(500).json({ message: 'email undefined or wrong type' });
  }
  if (typeof req.body.password === 'undefined' || typeof req.body.password !== 'string') {
    return res.status(500).json({ message: 'password undefined or wrong type' });
  }
  try {
    const { rows } = await db.query('SELECT * FROM userinfo WHERE email = $1', [req.body.email]);
    if (typeof req.session === 'undefined') {
      return res.status(500).json({ message: 'session undefined' });
    }
    if (rows[0].password !== req.body.password) {
      return res.redirect('/user/login');
    }
    req.session.uid = rows[0].id;
    req.session.email = rows[0].email;
    req.session.username = rows[0].username;
    return res.json({
      code: 0,
      message: 'success',
      username: rows[0].username,
    });
  } catch (e) {
    return res.status(500).json({ message: `user login error: ${e}` });
  }
};
