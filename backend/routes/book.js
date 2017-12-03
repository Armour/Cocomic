import express from 'express';

import { updateLike, addChapter, updateBookmark, editChapter } from '../controllers/chapter';
import { getBook, getPopularBooks, getNewestBooks, addBook, getUserFavorates, getUserCollections } from '../controllers/book';

const router = express.Router();

router.post('/like', updateLike);
router.post('/bookmark', updateBookmark);
router.post('/addBook', addBook);
router.post('/addChapter', addChapter);
router.post('/editChapter', editChapter);
router.get('/popular/:offset/:amount', getPopularBooks);
router.get('/newest/:offset/:amount', getNewestBooks);
router.get('/userCollections', getUserCollections);
router.get('/userFavorates', getUserFavorates);
router.get('/:bookId', getBook);

export default router;
