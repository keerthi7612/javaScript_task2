import transporter from "../config/emailConfig.js";
import { buildEmailContent } from "../utils/emailTemplates.js";

export const sendEmailService = async ({ to, name, type = {} }) => {
  try {
    const { subject, message } = buildEmailContent({
      name,
      type,
    });

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
