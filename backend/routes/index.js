import express from 'express';

import apiRtr from './api';
import userRtr from './user';

const router = express.Router();
router.use(apiRtr);
router.use(userRtr);
