import { sendEmailService } from "../services/emailService.js";
import {
  getMissingTemplateFields,
  getSupportedEmailTypes,
} from "../utils/emailTemplates.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendEmail = async (req, res) => {
  try {
    const { to, name, type = {} } = req.body;

    if (!to || !name || !type) {
      return res.status(400).json({
        success: false,
        message: "to, name and type are required",
      });
    }

    if (typeof to !== "string" || !emailRegex.test(to.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid name",
      });
    }

    if (typeof type !== "string" || !type.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email type",
      });
    }

    const supportedTypes = getSupportedEmailTypes();
    if (!supportedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Unsupported email type. Supported types: ${supportedTypes.join(", ")}`,
      });
    }

    const missingFields = getMissingTemplateFields(type);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing extraData fields for ${type}: ${missingFields.join(", ")}`,
      });
    }

    const result = await sendEmailService({
      to: to.trim(),
      name: name.trim(),
      type,
    });

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
