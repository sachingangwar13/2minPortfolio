import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    userName: {
      type: String,
      required: true,
      ref: "User",
    },
    languages: [{ type: String }],
    frameworks: [{ type: String }],
    Tools: [{ type: String }],
    DataBases: [{ type: String }],
    FrameworksAndLibraries: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Skills = mongoose.model("Skills", skillSchema);
