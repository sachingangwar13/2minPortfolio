import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// Backend/utils/mailer.js
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
<<<<<<< HEAD
    
  });

export async function sendOtpEmail(to, otp) {
  let message = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>2minPortfolio</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>`
=======
  });

export async function sendOtpEmail(to, otp) {
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
  const info = await transporter.sendMail({
    from: `2 Minute Portfolio <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your verification code",
<<<<<<< HEAD
    html: message,
=======
    text: `Your verification code is ${otp}. It expires in ${
      process.env.OTP_EXP_MINUTES || 10
    } minutes.`,
    html: `<p>Your verification code is <b>${otp}</b>. It expires in ${
      process.env.OTP_EXP_MINUTES || 10
    } minutes.</p>`,
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
  });
  return info?.messageId;
}
