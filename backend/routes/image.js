import express from 'express';

import { getImages } from '../controllers/image';

const router = express.Router();

router.post('/getImages', getImages);

export default router;
