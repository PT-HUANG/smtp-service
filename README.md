# 📧 Firebase Function - Contact Form Email Sender

這是一個使用 Firebase Functions (v2 API) 與 Nodemailer 製作的後端服務，透過 Gmail SMTP 將前端聯絡表單的資料以電子郵件方式寄送給指定收件者。

## 🔧 使用技術

- Firebase Functions v2（`onRequest` HTTP Trigger）
- Nodemailer（寄送 email）
- Gmail SMTP（作為郵件服務）

## 🚀 功能說明

此函式 `sendMail` 會接收前端傳來的 `POST` 請求，內容需包含：

- `name`：發送者名稱
- `email`：發送者信箱
- `message`：訊息內容

成功後會透過 Gmail 將內容寄送至預設收件人信箱（例如：`example123@gmail.com`）。

## 👌 基本需求

- `Google App Password`：必須事先申請一組 16 碼的 app password
- `Firebase Functions`：必須在 Firebase 上建立一個專案，選擇 Blaze 方案後開始使用 functions
- `Your Domain`：準備好您的 Domain (例如：`https://pt-huang.github.io`)，作為發送 API 用

## 🧭 使用方式

1. 安裝 Firebase CLI：

   ```bash
   npm install -g firebase-tools
   ```

2. 登入 Firebase：

   ```bash
   firebase login
   ```

3. 初始化 Firebase 專案：

   ```bash
   firebase init
   ```

   - Are you ready to proceed? 輸入 `Y`
   - 選擇 `Functions: Configure a Cloud Functions directory and its files`，按空白鍵選擇，按 Enter
   - 選擇 `Use an existing project`，按 Enter
   - 選擇你剛剛在 Firebase 上建立的專案名稱
   - 選擇撰寫語言：`JavaScript`
   - 問是否啟用 ESLint，選擇 `Y`
   - 問是否要立即安裝相依套件，選擇 `Y`

4. 進入 functions 目錄：

   ```bash
   cd functions
   ```

5. 安裝 nodemailer：

   ```bash
   npm install nodemailer
   ```

6. 將此專案中的 `index.js` 內容複製覆蓋 `functions` 資料夾中的 `index.js`。

7. 修改以下部分：

   - 更新 CORS 允許的 domain：

     ```js
     cors: ["https://pt-huang.github.io"],
     ```

   - 更換收件人 Email 與標題：

     ```js
     const info = await transporter.sendMail({
       from: `${name} <${email}>`,
       to: "qwe1593574268@gmail.com",
       subject: "[React-Tenfolio] Contact from email form",
       text: message,
     });
     ```

8. 部署 Cloud Function 到 Firebase：

   ```bash
   firebase deploy
   ```

   > **注意**：第一次部署時 CLI 會要求你輸入 `MAIL_USER`、`MAIL_PASS` 作為環境變數。

---

完成後，CLI 會顯示一組網址，該網址即為你的 API 端點，可用來發送 POST 請求寄送 Email。

---
