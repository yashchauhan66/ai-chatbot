// routes/auth.js
import express from 'express';
import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { SingupHandler, LoginHandler } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup', SingupHandler);

router.post('/login',LoginHandler);
  

export default router;
