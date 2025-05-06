import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
dotenv.config();

// 設定 HTTP request 頭為 JSON 格式
app.use(express.json());
app.use(cors({ origin: "https://pt-huang.github.io" }));

// 設定 Gmail SMTP 伺服器
const transporter = nodemailer.createTransport({
  service: "gmail", // 使用 Gmail 的 SMTP 服務
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 維持伺服器活躍
app.get("/", (req, res) => {
  res.send("Server is alive!");
});

// POST 請求來發送郵件
app.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `${name} ${email}`,
      to: "qwe1593574268@gmail.com", // 收件人
      subject: "[React-Tenfolio] Contact from email form", // 郵件標題
      text: message, // 郵件內容（純文字）
    });

    console.log("Message sent:", info.messageId);
    res.status(200).send({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email", error });
  }
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
