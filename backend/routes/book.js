import express from 'express';

import { updateLike, addChapter } from '../controllers/chapter';
import { getBook, addBook } from '../controllers/book';

const router = express.Router();

router.post('/addBook', addBook);
router.post('/addChapter', addChapter);
router.put('/:bookId/:chapterId/like', updateLike);
router.get('/:bookId', getBook);

export default router;
