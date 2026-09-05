const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { sendContactAck } = require('../services/notification.service');

const submitContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  sendContactAck(contact).catch(console.error);

  res.status(201).json(new ApiResponse(201, contact, 'Message sent successfully'));
});

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, contacts, 'Contacts list retrieved'));
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    throw new ApiError(404, 'Contact inquiry not found');
  }

  contact.status = status;
  await contact.save();
  res.status(200).json(new ApiResponse(200, contact, 'Status updated'));
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    throw new ApiError(404, 'Contact inquiry not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Contact deleted'));
});

module.exports = {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
};
