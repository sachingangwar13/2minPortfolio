import { Router } from "express";
import { Experience } from "../models/experience.model.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = Router();

// Create experience entry
router.post("/", optionalAuth, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload?.userName)
      return res.status(400).json({ message: "userName is required" });
    if (req.user?.id) payload.userId = req.user.id;
    const doc = await Experience.create(payload);
    return res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// List experiences for a user
router.get("/:userName", optionalAuth, async (req, res) => {
  try {
    const base = { userName: req.params.userName };
    const query = req.user?.id
      ? { $or: [base, { userId: req.user.id }] }
      : base;
    const docs = await Experience.find(query).sort({
      createdAt: -1,
    });
    return res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an experience by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Experience.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
