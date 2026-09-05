const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { loginValidator, registerValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validation.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.post('/login', loginValidator, validate, authController.login);
router.post('/register', registerValidator, validate, authController.register);
router.get('/profile', verifyJWT, authController.getProfile);

module.exports = router;
