const { sendEmail } = require('./email.service');

const sendAdmissionConfirmation = async (admission) => {
  const subject = `Admission Application Received - ${admission.applicationNo}`;
  const html = `
    <h2>Dear ${admission.parentName},</h2>
    <p>Thank you for submitting an admission application for <strong>${admission.studentName}</strong> at Pavna School.</p>
    <p>Your Application Reference Number is: <strong>${admission.applicationNo}</strong></p>
    <p>Our admissions team will review the details and reach out to you shortly.</p>
    <br/>
    <p>Best regards,<br/>Pavna School Admissions Team</p>
  `;

  return sendEmail({
    to: admission.email,
    subject,
    html,
  });
};

const sendContactAck = async (contact) => {
  const subject = `We have received your message - Pavna School`;
  const html = `
    <h2>Hello ${contact.name},</h2>
    <p>Thank you for contacting Pavna School regarding "${contact.subject}". We have received your query and will respond soon.</p>
    <br/>
    <p>Best regards,<br/>Pavna School Team</p>
  `;

  return sendEmail({
    to: contact.email,
    subject,
    html,
  });
};

module.exports = {
  sendAdmissionConfirmation,
  sendContactAck,
};
