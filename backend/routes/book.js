import express from 'express';

import { getChapter } from '../controllers/chapter';
import { getBook } from '../controllers/book';

const router = express.Router();

router.get('/:bookId/:chapterId', getChapter);
router.get('/:bookId', getBook);

export default router;
