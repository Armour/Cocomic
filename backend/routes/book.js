import express from 'express';

import { updateLike } from '../controllers/chapter';
import { getBook } from '../controllers/book';

const router = express.Router();

router.put('/:bookId/:chapterId/like', updateLike);
router.get('/:bookId', getBook);

export default router;
