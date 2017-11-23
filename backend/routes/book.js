import express from 'express';

import { updateLike } from '../controllers/chapter';
import { getBook, addBook, addChapter } from '../controllers/book';

const router = express.Router();

router.put('/:bookId/:chapterId/like', updateLike);
router.get('/:bookId', getBook);
router.post('/addBook', addBook);
router.post('/addChapter/:bookId', addChapter);

export default router;
