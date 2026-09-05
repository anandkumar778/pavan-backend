const Page = require('../models/Page');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createOrUpdatePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  let bannerImage = req.body.bannerImage || '';
  if (req.file) {
    bannerImage = `/uploads/${req.file.filename}`;
  }

  let page = await Page.findOne({ slug });

  if (page) {
    page.title = req.body.title || page.title;
    page.content = req.body.content || page.content;
    page.metaTitle = req.body.metaTitle || page.metaTitle;
    page.metaDescription = req.body.metaDescription || page.metaDescription;
    if (bannerImage) page.bannerImage = bannerImage;
    if (req.body.isActive !== undefined) page.isActive = req.body.isActive;
    await page.save();
  } else {
    page = await Page.create({
      slug,
      title: req.body.title,
      content: req.body.content,
      bannerImage,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    });
  }

  res.status(200).json(new ApiResponse(200, page, 'Page content saved'));
});

const getPageBySlug = asyncHandler(async (req, res) => {
  const page = await Page.findOne({ slug: req.params.slug, isActive: true });
  if (!page) {
    throw new ApiError(404, 'Page not found');
  }
  res.status(200).json(new ApiResponse(200, page, 'Page retrieved'));
});

const getAllPages = asyncHandler(async (req, res) => {
  const pages = await Page.find();
  res.status(200).json(new ApiResponse(200, pages, 'Pages retrieved'));
});

const deletePage = asyncHandler(async (req, res) => {
  const page = await Page.findOneAndDelete({ slug: req.params.slug });
  if (!page) {
    throw new ApiError(404, 'Page not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Page deleted'));
});

module.exports = {
  createOrUpdatePage,
  getPageBySlug,
  getAllPages,
  deletePage,
};
