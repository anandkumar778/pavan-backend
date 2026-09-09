const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facility.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/', facilityController.getActiveFacilities);
router.get('/:id', facilityController.getFacilityById);

router.use(verifyJWT);

router.post('/', upload.single('image'), facilityController.createFacility);
router.put('/:id', upload.single('image'), facilityController.updateFacility);
router.delete('/:id', facilityController.deleteFacility);

module.exports = router;