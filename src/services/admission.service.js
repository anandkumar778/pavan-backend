const Admission = require('../models/Admission');

const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `PAV-${year}-${randomDigits}`;
};

const createAdmissionApplication = async (data) => {
  const applicationNo = generateApplicationNumber();
  const admission = await Admission.create({
    ...data,
    applicationNo,
  });
  return admission;
};

module.exports = {
  generateApplicationNumber,
  createAdmissionApplication,
};
