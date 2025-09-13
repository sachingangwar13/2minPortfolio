import { Router } from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { Otp } from "../models/otp.model.js";
import { sendOtpEmail } from "../utils/mailer.js";
import { OAuth2Client } from "google-auth-library";

const router = Router();

// Request OTP for signup
router.post("/otp/request", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already in use" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const minutes = Number(process.env.OTP_EXP_MINUTES || 10);
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
    await Otp.findOneAndUpdate(
      { email, purpose: "signup" },
      { $set: { otpHash, attempts: 0, expiresAt } },
      { upsert: true }
    );
    await sendOtpEmail(email, otp);
    return res.status(200).json({ message: "OTP sent" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Verify OTP and create user
router.post("/signup/verify", async (req, res) => {
  try {
    const { email, username, password, otp } = req.body;
    if (!email || !username || !password || !otp)
      return res.status(400).json({ message: "All fields are required" });
    const doc = await Otp.findOne({ email, purpose: "signup" });
    if (!doc) return res.status(400).json({ message: "No OTP requested" });
    if (doc.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });
    if (doc.attempts >= 5)
      return res.status(429).json({ message: "Too many attempts" });
    const ok = await bcrypt.compare(otp, doc.otpHash);
    if (!ok) {
      await Otp.updateOne({ _id: doc._id }, { $inc: { attempts: 1 } });
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const user = await User.create({ username, email, password });
    await Otp.deleteOne({ _id: doc._id });
    const token = user.generateToken();
    return res
      .status(201)
      .json({ user: { id: user._id, username, email }, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Google login: verify ID token from client and issue our JWT
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "idToken required" });
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const email = payload.email;
    const username = (payload.name || email.split("@")[0])
      .toLowerCase()
      .replace(/\s+/g, "");
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username,
        email,
        password: Math.random().toString(36).slice(2),
      });
    }
    const token = user.generateToken();
    return res
      .status(200)
      .json({ token, user: { id: user._id, username: user.username, email } });
  } catch (e) {
    
    console.error(e);
    return res.status(401).json({ message: "Google token invalid" });
  }
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = user.generateToken();
    return res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await user.isPasswordCorrect(password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    return res.status(200).json({
      message: "Logged in",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
