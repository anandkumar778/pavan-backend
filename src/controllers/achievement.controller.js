const Achievement = require('../models/Achievement');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createAchievement = asyncHandler(async (req, res) => {
  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      throw new ApiError(400, 'Please provide at least one achievement item.');
    }
    const achievements = await Achievement.insertMany(req.body);
    return res.status(201).json(new ApiResponse(201, achievements, `${achievements.length} Achievements added successfully.`));
  }

  let image = req.body.image || '';
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const achievement = await Achievement.create({
    ...req.body,
    image,
  });

  res.status(201).json(new ApiResponse(201, achievement, 'Achievement recorded successfully'));
});

const getActiveAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({ isActive: true }).sort({ achievementDate: -1 });
  res.status(200).json(new ApiResponse(200, achievements, 'Achievements retrieved'));
});

const updateAchievement = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const achievement = await Achievement.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!achievement) {
    throw new ApiError(404, 'Achievement not found');
  }

  res.status(200).json(new ApiResponse(200, achievement, 'Achievement updated'));
});

const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndDelete(req.params.id);
  if (!achievement) {
    throw new ApiError(404, 'Achievement not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Achievement deleted'));
});

module.exports = {
  createAchievement,
  getActiveAchievements,
  updateAchievement,
  deleteAchievement,
};
