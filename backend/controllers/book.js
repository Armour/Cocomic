import db from '../db';
import { uploadImages } from './image';

export const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookQuery = `
    SELECT id, user_id as "userId", title, cover_image as "coverImage", description, root_chapter_id as "rootChapterId"
    FROM book WHERE id=($1)
    `;
    const { rows: books } = await db.query(bookQuery, [bookId]);
    if (books === undefined || books.length === 0) throw Error('wrong bookId');

    const chapterQuery = `
    SELECT c.id, c.title, c.user_id as "userId", c.book_id as "bookId", c.parent_id as "parentId",
    c.like_sum as "likeSum", c.images, c.create_date as "createDate", c.title, c.description,
    ( SELECT username FROM userinfo u WHERE c.user_id = u.id ) username,
    ( SELECT COUNT(*) = 1 FROM likeinfo l WHERE c.id = l.chapter_id AND l.user_id = $2 ) isLiked,
    ( SELECT COUNT(*) = 1 FROM bookmarkinfo l WHERE c.id = l.chapter_id AND l.user_id = $2 ) isBookmarked
    FROM chapter c WHERE book_id=($1)
    `;
    const userId = typeof req.session === 'undefined' || typeof req.session.uid === 'undefined' ? 0 : req.session.uid;
    const { rows: chapters } = await db.query(chapterQuery, [bookId, userId]);
    res.json({ books, chapters });
  } catch (e) {
    res.status(404).json({ message: `book not found: ${e.message}` });
  }
};

const getBooks = async (req, res, query) => {
  try {
    const { offset, amount } = req.params;
    const { rows: books } = await db.query(query, [amount, offset]);
    if (books === undefined || books.length === 0) throw Error();

    res.json({ books });
  } catch (e) {
    res.status(404).json({ message: 'book not found' });
  }
};

export const getPopularBooks = async (req, res) => {
  const query = `
  SELECT book.id, title, cover_image as "coverImage", description, like_sum, username
  FROM book, userinfo
  WHERE book.user_id = userinfo.id
  ORDER BY like_sum DESC LIMIT $1 Offset $2
  `;
  getBooks(req, res, query);
};

export const getNewestBooks = async (req, res) => {
  const query = `
  SELECT book.id, title, cover_image as "coverImage", description, like_sum, username
  FROM book, userinfo
  WHERE book.user_id = userinfo.id
  ORDER BY book.id DESC LIMIT $1 Offset $2
  `;
  try {
    const { offset, amount } = req.params;
    const { rows: books } = await db.query(query, [amount, offset]);
    if (books === undefined || books.length === 0) throw Error();

    res.json({ books });
  } catch (e) {
    res.status(404).json({ message: `book not found ${e.message} ` });
  }
};

export const getUserCollections = async (req, res) => {
  const query = `
  SELECT b.id, b.title, b.cover_image as "coverImage", b.description, b.like_sum, u.username
  FROM book b LEFT JOIN userinfo u ON b.user_id = u.id
  WHERE b.user_id = $1 ORDER BY like_sum DESC
  `;
  try {
    const { rows: books } = await db.query(query, [req.session.uid]);
    if (books === undefined || books.length === 0) throw Error();
    return res.status(200).json({ books });
  } catch (e) {
    return res.status(204).json({ message: `user collection errors: ${e} ` });
  }
};

export const getUserFavorates = async (req, res) => {
  const query = `
  SELECT b.id, b.title, b.cover_image as "coverImage", b.description, b.like_sum, u.username
  FROM book b
    LEFT JOIN userinfo u ON b.user_id = u.id
  WHERE b.id IN (SELECT book_id FROM bookmarkinfo l WHERE l.user_id = $1)  ORDER BY like_sum DESC
  `;
  try {
    const { rows: books } = await db.query(query, [req.session.uid]);
    if (books === undefined || books.length === 0) throw Error();

    res.json({ books });
  } catch (e) {
    res.status(204).json({ message: `user collection errors: ${e} ` });
  }
};

export const addBook = async (req, res) => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await db.pool.connect();
  try {
    const {
      bookTitle,
      coverImage,
      description,
      chapters,
    } = req.body;
    const { uid: userId } = req.session;
    const chapterImagesList = [];
    for (let i = 0; i < chapters.length; i += 1) {
      chapterImagesList.push(uploadImages(chapters[i].images));
      if (chapterImagesList[chapterImagesList.length - 1] === undefined ||
          chapterImagesList[chapterImagesList.length - 1].length === 0) {
        throw Error('Should have at least one image for new chapter');
      }
    }
    const coverImageHash = uploadImages(coverImage);
    if (coverImageHash === undefined || coverImageHash.length === 0) {
      throw Error('Should have at least one image for coverimage');
    }

    await client.query('BEGIN');
    // Insert book
    const bookQuery = `
    INSERT INTO book(user_id, title, cover_image, description)
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    const bookQueryValues = [userId, bookTitle, coverImageHash[0], description];
    const { rows: newBook } = await client.query(bookQuery, bookQueryValues);
    if (newBook === undefined || newBook.length === 0) {
      throw Error('Book insert failed');
    }
    const bookId = newBook[0].id;
    // Insert chapter
    const chapterIds = [0];
    const chapterQuery = `
    INSERT INTO chapter(user_id, book_id, title, description, parent_id, images)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    for (let i = 0; i < chapters.length; i += 1) {
      const chapterQueryValues = [userId, bookId, chapters[i].title, chapters[i].description, chapterIds[chapterIds.length - 1], chapterImagesList[i]];
      const { rows: newChapter } = await client.query(chapterQuery, chapterQueryValues); // eslint-disable-line no-await-in-loop
      if (newChapter === undefined || newChapter.length === 0) {
        throw Error('Chapter insert failed');
      }
      chapterIds.push(newChapter[0].id);
    }
    // Update book root_chapter_id info
    const updateQuery = `
    UPDATE book
    SET root_chapter_id = $1
    WHERE id=($2)`;
    const updateQueryValues = [chapterIds[1], bookId];
    await client.query(updateQuery, updateQueryValues);
    await client.query('COMMIT');
    chapterIds.shift(); // remove 0 root_id
    return res.json({ bookId, chapters: chapterIds, chapterImages: chapterImagesList });
  } catch (e) {
    await client.query('ROLLBACK');
    return res.status(500).json({ message: e.message });
  } finally {
    client.release();
  }
};
