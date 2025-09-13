import mongoose from "mongoose";


const introductionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Users",
  },
  userName: {
    type: String,
    required: true,
    ref: "User",
  },
  fullName: {
    type: String,
    required: true,
    minLength: [3, "Username must be at least 3 characters long"],
  },
  title: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  status: [{
    type: String,
    enum: ["hireme", "looking for a job", "open to work"],
    required: true,
  }],
  socialLinks: {
    gmail: {
      type: String,
      required: [true, "Gmail is required"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid Gmail address",
      },
    },

    github: {
      type: String,
      required: [true, "Github is required"],
    },

    linkedin: {
      type: String,
      required: [true, "Linkedin is required"],
    },
    x: {
      type: String,
      required: [true, "X is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone no. is required"],
    },
    image: {
      type: String,
      required: [true, "image not found"],
    },
  },
  about: {
    type: String,
    default: "",
  },
});

export const Introduction = mongoose.model("Introductions", introductionSchema);
