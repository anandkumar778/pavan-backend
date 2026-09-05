const { body } = require('express-validator');

const admissionValidator = [
  body('studentName').trim().notEmpty().withMessage('Student name is required.'),
  body('dob').notEmpty().withMessage('Date of birth is required.'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required.'),
  body('gradeApplying').notEmpty().withMessage('Grade applying for is required.'),
  body('parentName').trim().notEmpty().withMessage('Parent/Guardian name is required.'),
  body('email').trim().isEmail().withMessage('Valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Contact phone number is required.'),
];

module.exports = {
  admissionValidator,
};
