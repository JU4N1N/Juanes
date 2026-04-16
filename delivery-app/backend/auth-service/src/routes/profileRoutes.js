import express from 'express';

import profileController from '../controllers/profileController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Perfil
router.get('/profile', verifyToken, profileController.getProfile);
router.put('/profile', verifyToken, profileController.updateProfile);

// Direcciones
router.get('/addresses', verifyToken, profileController.getAddresses);
router.post('/addresses', verifyToken, profileController.createAddress);
router.put('/addresses/:id', verifyToken, profileController.updateAddress);
router.delete('/addresses/:id', verifyToken, profileController.deleteAddress);

export default router;