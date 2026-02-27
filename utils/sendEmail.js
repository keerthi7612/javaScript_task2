import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, message) => {
  console.log(`Email sent to ${to}: ${subject}`);
};
