import express from 'express';

import { updateLike, addChapter } from '../controllers/chapter';
import { getBook, getPopularBooks, addBook } from '../controllers/book';

const router = express.Router();

router.get('/like/:chapterId/:toggle', updateLike);
router.post('/addBook', addBook);
router.post('/addChapter', addChapter);
router.get('/popular/:offset/:amount', getPopularBooks);
router.get('/:bookId', getBook);

export default router;
