import transporter from "../config/emailConfig.js";

export const sendEmailService = async ({ to, subject, message }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);

    return { success: true, data: info };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
