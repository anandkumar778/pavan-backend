const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/admin.middleware');

router.use(verifyJWT);
router.use(requireAdmin(['superadmin']));

router.get('/', adminController.getAllAdmins);
router.patch('/:id', adminController.updateAdminStatus);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
