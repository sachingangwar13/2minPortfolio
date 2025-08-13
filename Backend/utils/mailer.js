import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// Backend/utils/mailer.js
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

export async function sendOtpEmail(to, otp) {
  const info = await transporter.sendMail({
    from: `2 Minute Portfolio <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your verification code",
    text: `Your verification code is ${otp}. It expires in ${
      process.env.OTP_EXP_MINUTES || 10
    } minutes.`,
    html: `<p>Your verification code is <b>${otp}</b>. It expires in ${
      process.env.OTP_EXP_MINUTES || 10
    } minutes.</p>`,
  });
  return info?.messageId;
}
