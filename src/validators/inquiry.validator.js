const { body } = require('express-validator');

const inquiryValidator = [
  body('parentName').trim().notEmpty().withMessage('Parent name is required.'),
  body('studentName').optional().trim(),
  body('email').trim().isEmail().withMessage('Valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('gradeInterested').notEmpty().withMessage('Grade interested is required.'),
  body('message').optional().trim(),
];

module.exports = {
  inquiryValidator,
};
