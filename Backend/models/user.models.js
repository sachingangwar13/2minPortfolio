import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must be at least 3 characters long"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      enum: ["emerald", "violet", "cyan"],
      default: "emerald",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  let token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return token;
};

export const User = mongoose.model("Users", userSchema);
