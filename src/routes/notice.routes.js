const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/active', noticeController.getActiveNotices);

router.use(verifyJWT);

router.get('/', noticeController.getAllNotices);
router.post('/', upload.single('attachment'), noticeController.createNotice);
router.put('/:id', upload.single('attachment'), noticeController.updateNotice);
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;
