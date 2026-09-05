const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: String,
      unique: true,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    gradeApplying: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    previousSchool: String,
    documents: [
      {
        name: String,
        url: String,
      },
    ],
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admission', admissionSchema);
