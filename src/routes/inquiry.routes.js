const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');
const { inquiryValidator } = require('../validators/inquiry.validator');
const validate = require('../middleware/validation.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.post('/', inquiryValidator, validate, inquiryController.createInquiry);
router.get('/', verifyJWT, inquiryController.getAllInquiries);
router.patch('/:id/status', verifyJWT, inquiryController.updateInquiryStatus);
router.delete('/:id', verifyJWT, inquiryController.deleteInquiry);

module.exports = router;
