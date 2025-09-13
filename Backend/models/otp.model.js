import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true },
  otpHash: { type: String, required: true },
  purpose: { type: String, enum: ["signup"], default: "signup" },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
  payload: { type: mongoose.Schema.Types.Mixed },
});

export const Otp = mongoose.model("Otp", otpSchema);
