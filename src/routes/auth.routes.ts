// src/routes/auth.routes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);

export default router;