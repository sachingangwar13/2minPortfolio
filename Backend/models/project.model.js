import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, ref: "User" },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    techStack: [{ type: String }],
    github: { type: String, default: "" },
    live: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Projects", projectSchema);
