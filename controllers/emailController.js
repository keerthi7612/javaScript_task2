import { sendEmailService } from "../services/emailService.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof to !== "string" || !emailRegex.test(to.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const result = await sendEmailService({ to, subject, message });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
