import express from 'express';

import { register, getUser, logout, login } from '../controllers/user';

const router = express.Router();

router.post('/register', register);
router.get('/', getUser);
router.get('/logout', logout);
router.post('/login', login);
export default router;
