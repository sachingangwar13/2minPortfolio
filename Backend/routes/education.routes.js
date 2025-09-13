import { Router } from "express";
import { Education } from "../models/education.models.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = Router();

// Upsert education by username
router.post("/", optionalAuth, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload?.username)
      return res.status(400).json({ message: "username is required" });
    if (req.user?.id) payload.userId = req.user.id;
    const doc = await Education.findOneAndUpdate(
      { username: payload.username },
      { $set: payload },
      { upsert: true, new: true }
    );
    return res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get education by username
router.get("/:username", optionalAuth, async (req, res) => {
  try {
    const query = req.user?.id
      ? { $or: [{ userId: req.user.id }, { username: req.params.username }] }
      : { username: req.params.username };
    const doc = await Education.findOne(query);
    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete education by username
router.delete("/:username", async (req, res) => {
  try {
    await Education.findOneAndDelete({ username: req.params.username });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
