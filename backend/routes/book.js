import express from 'express';

import { updateLike, addChapter } from '../controllers/chapter';
import { getBook, getPopularBooks, addBook } from '../controllers/book';

const router = express.Router();

router.post('/addBook', addBook);
router.post('/addChapter', addChapter);
router.get('/popular/:offset/:amount', getPopularBooks);
router.put('/:bookId/:chapterId/like', updateLike);
router.get('/:bookId', getBook);

export default router;
