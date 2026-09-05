const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievement.controller');
const upload = require('../middleware/upload.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/', achievementController.getActiveAchievements);

router.use(verifyJWT);

router.post('/', upload.single('image'), achievementController.createAchievement);
router.put('/:id', upload.single('image'), achievementController.updateAchievement);
router.delete('/:id', achievementController.deleteAchievement);

module.exports = router;
