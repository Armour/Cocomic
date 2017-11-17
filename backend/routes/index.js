import express from 'express';

import apiRtr from './api';
import userRtr from './user';
import bookRtr from './book';
import imgRtr from './image';

const router = express.Router();
router.use('/api', apiRtr);
router.use('/user', userRtr);
router.use('/book', bookRtr);
router.use('/image', imgRtr);

export default router;
