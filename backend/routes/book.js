import express from 'express';

import { getChapter, updateLike } from '../controllers/chapter';
import { getBook } from '../controllers/book';

const router = express.Router();

router.get('/:bookId/:chapterId', getChapter);
router.put('/:bookId/:chapterId/like', updateLike);
router.get('/:bookId', getBook);

export default router;
