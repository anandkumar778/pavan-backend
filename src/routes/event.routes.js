const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/active', eventController.getActiveEvents);

router.use(verifyJWT);

router.get('/', eventController.getAllEvents);
router.post('/', upload.single('bannerImage'), eventController.createEvent);
router.put('/:id', upload.single('bannerImage'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
