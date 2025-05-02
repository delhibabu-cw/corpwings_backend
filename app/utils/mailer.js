const nodemailer = require("nodemailer");
const { isFormatDate, isFormatTime } = require("./helper");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUserCreatedMail = async (userData) => {
  const mailOptions = {
    from: `"Corpwings EnrollData" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL,
    subject: "New User Created",
    html: `
      <h2>New User Details</h2>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>Name</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${userData.fullName}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>Email</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${userData.email}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>Mobile</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${userData.mobile}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>Gender</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${userData.gender}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>College Name</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${userData.collegeName}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
       <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>Degree</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${userData.degree}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="display: flex; align-items: center; width: 120px;">
        <p><strong>Date</strong></p>
        <div style="flex: 1;"></div>
        <p>:</p>
        </div>
        <p>${isFormatDate(userData.createdAt)} <span>${isFormatTime(
      userData.createdAt
    )}</span></p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendUserCreatedMail };
