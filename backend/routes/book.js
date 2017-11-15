import express from 'express';

import { getBook } from '../controllers/book';

const router = express.Router();

router.post('/:bookId', getBook);

export default router;
