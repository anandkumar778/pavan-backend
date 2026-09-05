const Gallery = require('../models/Gallery');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const addGalleryMedia = asyncHandler(async (req, res) => {
  // Case 1: Multiple JSON objects sent in request body as an Array
  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      throw new ApiError(400, 'Please provide at least one gallery item in the array.');
    }
    const items = await Gallery.insertMany(req.body);
    return res.status(201).json(new ApiResponse(201, items, `${items.length} Gallery items added successfully.`));
  }

  // Case 2: Multiple files uploaded via multipart form-data
  if (req.files && req.files.length > 0) {
    const mediaItems = req.files.map((file, index) => ({
      title: req.body.title || `Gallery Media ${index + 1}`,
      albumName: req.body.albumName || 'General',
      mediaUrl: `/uploads/${file.filename}`,
      mediaType: file.mimetype.startsWith('video') ? 'video' : 'image',
      category: req.body.category || 'General',
    }));
    const items = await Gallery.insertMany(mediaItems);
    return res.status(201).json(new ApiResponse(201, items, `${items.length} Files uploaded to gallery successfully.`));
  }

  // Case 3: Single JSON object or single file upload
  let mediaUrl = req.body.mediaUrl || '';
  if (req.file) {
    mediaUrl = `/uploads/${req.file.filename}`;
  }

  if (!mediaUrl) {
    throw new ApiError(400, 'Media file or URL is required');
  }

  const item = await Gallery.create({
    ...req.body,
    mediaUrl,
  });

  res.status(201).json(new ApiResponse(201, item, 'Media added to gallery successfully.'));
});

const getGalleryItems = asyncHandler(async (req, res) => {
  const { album, category } = req.query;
  let filter = { isActive: true };

  if (album) filter.albumName = album;
  if (category) filter.category = category;

  const items = await Gallery.find(filter).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, items, 'Gallery items retrieved'));
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Gallery item not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Item deleted successfully'));
});

module.exports = {
  addGalleryMedia,
  getGalleryItems,
  deleteGalleryItem,
};
