import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const emailConfig = async (to, subject, content) => {
  try {
    await transporter.sendMail({
      from: `EduLink <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: content,
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);

    if (err.responseCode === 550 || err.code === "EENVELOPE") {
      throw new Error("The email address not exist");
    }

    throw new Error("There was a server error");
  }
};
