// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { defineString } = require("firebase-functions/params");
const { onRequest } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { initializeApp } = require("firebase-admin/app");

dotenv.config();
initializeApp();

// 環境變數
const mailUser = defineString("MAIL_USER");
const mailPass = defineString("MAIL_PASS");

// nodemailer 設定
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailUser.value(),
    pass: mailPass.value(),
  },
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.sendMail = onRequest(
  {
    cors: ["https://pt-huang.github.io"],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests are allowed." });
      return;
    }

    const { name, email, message } = req.body;

    try {
      const info = await transporter.sendMail({
        from: `${name} <${email}>`,
        to: "qwe1593574268@gmail.com",
        subject: "[React-Tenfolio] Contact from email form",
        text: message,
      });

      console.log("Message sent:", info.messageId);
      res.status(200).send({ message: "Email sent successfully!", info });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send({ message: "Failed to send email", error });
    }
  }
);
