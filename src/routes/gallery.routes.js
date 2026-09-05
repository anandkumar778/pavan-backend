const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/', galleryController.getGalleryItems);

router.use(verifyJWT);

router.post('/', upload.array('media', 10), galleryController.addGalleryMedia);
router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router;
