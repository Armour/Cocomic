import express from 'express';

import { getImages, uploadImages } from '../controllers/image';

const router = express.Router();

router.post('/uploadImages', uploadImages);
router.post('/getImages', getImages);

export default router;
