import express from 'express';

import { register } from '../controllers/user';

const router = express.Router();

/* API */
router.post('/register', register);

export default router;
