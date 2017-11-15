import express from 'express';

import { getChapter } from '../controllers/chapter';
import { getBook } from '../controllers/book';

const router = express.Router();

router.post('/chapter/:chapterId', getChapter);
router.post('/:bookId', getBook);

export default router;
