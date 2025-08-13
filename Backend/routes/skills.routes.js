import { Router } from "express";
import { Skills } from "../models/skills.model.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = Router();

// Upsert skills for user
router.post("/", optionalAuth, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload?.userName)
      return res.status(400).json({ message: "userName is required" });
    if (req.user?.id) payload.userId = req.user.id;
    const doc = await Skills.findOneAndUpdate(
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

// Get skills by userName
router.get("/:userName", optionalAuth, async (req, res) => {
  try {
    const query = req.user?.id
      ? { $or: [{ userId: req.user.id }, { userName: req.params.userName }] }
      : { userName: req.params.userName };
    const doc = await Skills.findOne(query);
    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete skills by userName
router.delete("/:userName", async (req, res) => {
  try {
    await Skills.findOneAndDelete({ userName: req.params.userName });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
