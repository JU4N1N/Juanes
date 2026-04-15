const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const verifyToken = require('../middlewares/authMiddleware');


router.get('/profile', verifyToken, profileController.getProfile);
router.put('/profile', verifyToken, profileController.updateProfile);

router.get('/addresses', verifyToken, profileController.getAddresses);
router.post('/addresses', verifyToken, profileController.createAddress);
router.put('/addresses/:id', verifyToken, profileController.updateAddress);
router.delete('/addresses/:id', verifyToken, profileController.deleteAddress);

module.exports = router;