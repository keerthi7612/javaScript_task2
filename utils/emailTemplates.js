const emailTemplates = {
  welcome: {
    subject: "Interview Invitation",
    message:
      "Dear {name},\n\nGreetings from our team. We are pleased to invite you to attend the interview process. Please let us know your availability for the scheduled discussion.\n\nBest regards,\nHiring Team",
  },
  selected: {
    subject: "Interview Selection Update",
    message:
      "Dear {name},\n\nWe are pleased to inform you that you have been selected in the interview process. Congratulations, and we look forward to the next steps with you.\n\nBest regards,\nHiring Team",
  },
  rejected: {
    subject: "Interview Result Notification",
    message:
      "Dear {name},\n\nThank you for attending the interview. After careful evaluation, we regret to inform you that you have not been selected at this time. We appreciate your interest and wish you success ahead.\n\nBest regards,\nHiring Team",
  },
};

const requiredFieldsByType = {
  welcome: [],
  selected: [],
  rejected: [],
};

const injectValues = (template, values) => {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = values[key];
    return value === undefined || value === null ? "" : String(value);
  });
};

export const buildEmailContent = ({ name, type = {} }) => {
  const selectedTemplate = emailTemplates[type];

  if (!selectedTemplate) {
    throw new Error(`Unsupported email type: ${type}`);
  }

  const values = {
    name,
  };

  return {
    subject: injectValues(selectedTemplate.subject, values),
    message: injectValues(selectedTemplate.message, values),
  };
};

export const getSupportedEmailTypes = () => Object.keys(emailTemplates);

export const getMissingTemplateFields = (type = {}) => {
  const requiredFields = requiredFieldsByType[type] || [];

  return requiredFields.filter((field) => {
    return value === undefined || value === null || String(value).trim() === "";
  });
};
