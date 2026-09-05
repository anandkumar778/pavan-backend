const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { contactValidator } = require('../validators/contact.validator');
const validate = require('../middleware/validation.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.post('/', contactValidator, validate, contactController.submitContact);
router.get('/', verifyJWT, contactController.getAllContacts);
router.patch('/:id/status', verifyJWT, contactController.updateContactStatus);
router.delete('/:id', verifyJWT, contactController.deleteContact);

module.exports = router;
