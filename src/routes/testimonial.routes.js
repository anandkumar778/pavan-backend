const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/', testimonialController.getActiveTestimonials);

router.use(verifyJWT);

router.post('/', upload.single('photo'), testimonialController.createTestimonial);
router.put('/:id', upload.single('photo'), testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
