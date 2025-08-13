import { Router } from "express";
import { Introduction } from "../models/introduction.model.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import optionalAuth from "../middleware/optionalAuth.js";

const upload = multer({ dest: "uploads/" });

const router = Router();

// Create or update introduction for a user
router.post("/", optionalAuth, upload.single("image"), async (req, res) => {
  try {
    const payload = req.body;
    if (!payload?.userName)
      return res.status(400).json({ message: "userName is required" });
    if (req.user?.id) payload.userId = req.user.id;
    // If file present, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });
      payload.socialLinks = payload.socialLinks
        ? JSON.parse(payload.socialLinks)
        : {};
      payload.socialLinks.image = result.secure_url;
      fs.unlink(req.file.path, () => {});
    }
    const doc = await Introduction.findOneAndUpdate(
      { userName: payload.userName },
      { $set: payload },
      { upsert: true, new: true }
    );
    return res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get introduction by userName
router.get("/:userName", optionalAuth, async (req, res) => {
  try {
    const query = req.user?.id
      ? { $or: [{ userId: req.user.id }, { userName: req.params.userName }] }
      : { userName: req.params.userName };
    const doc = await Introduction.findOne(query);
    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete introduction by userName
router.delete("/:userName", async (req, res) => {
  try {
    await Introduction.findOneAndDelete({ userName: req.params.userName });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
