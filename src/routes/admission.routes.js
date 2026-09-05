const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admission.controller');
const upload = require('../middleware/upload.middleware');
const { admissionValidator } = require('../validators/admission.validator');
const validate = require('../middleware/validation.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.post(
  '/',
  upload.array('documents', 5),
  admissionValidator,
  validate,
  admissionController.submitAdmission
);

router.get('/', verifyJWT, admissionController.getAllAdmissions);
router.get('/:id', verifyJWT, admissionController.getAdmissionById);
router.patch('/:id/status', verifyJWT, admissionController.updateAdmissionStatus);

module.exports = router;
