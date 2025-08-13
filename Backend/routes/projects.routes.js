import { Router } from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { Project } from "../models/project.model.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

// Create or update project (by optional id)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.body;
    const payload = { ...req.body };
    if (!payload?.userName)
      return res.status(400).json({ message: "userName is required" });

    if (typeof payload.techStack === "string") {
      try {
        payload.techStack = JSON.parse(payload.techStack);
      } catch {
        payload.techStack = [];
      }
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });
      payload.image = result.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    let doc;
    if (id) {
      doc = await Project.findByIdAndUpdate(
        id,
        { $set: payload },
        { new: true }
      );
    } else {
      doc = await Project.create(payload);
    }
    return res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// List projects for a user
router.get("/:userName", async (req, res) => {
  try {
    const docs = await Project.find({ userName: req.params.userName }).sort({
      createdAt: -1,
    });
    return res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
