// Backend/test-mail.js
import "dotenv/config";
import nodemailer from "nodemailer";
const t = nodemailer.createTransport({
  host: "smtp.gmail.com", port: 465, secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
await t.verify(); // throws if bad
console.log("OK");