import express from 'express';
import AuthController from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Públicas
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protegida
router.get('/me', verifyToken, AuthController.getMe);

export default router;