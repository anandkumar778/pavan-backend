const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/', facultyController.getFacultyList);
router.get('/:id', facultyController.getFacultyById);

router.use(verifyJWT);

router.post('/', upload.single('image'), facultyController.createFaculty);
router.put('/:id', upload.single('image'), facultyController.updateFaculty);
router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;