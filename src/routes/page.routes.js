const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/all', verifyJWT, pageController.getAllPages);
router.get('/:slug', pageController.getPageBySlug);

router.use(verifyJWT);

router.post('/:slug', upload.single('bannerImage'), pageController.createOrUpdatePage);
router.put('/:slug', upload.single('bannerImage'), pageController.createOrUpdatePage);
router.delete('/:slug', pageController.deletePage);

module.exports = router;
