import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const router = Router();

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = { id: payload._id };
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  return res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    theme: user.theme,
  });
});

router.patch("/me", requireAuth, async (req, res) => {
  const { theme } = req.body;
  const allowed = ["emerald", "violet", "cyan"];
  if (theme && !allowed.includes(theme))
    return res.status(400).json({ message: "Invalid theme" });
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { theme } },
    { new: true }
  );
  return res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    theme: user.theme,
  });
});

// Public: get minimal user info by username (for portfolio theme)
router.get("/by-username/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).lean();
  if (!user) return res.status(404).json({ message: "Not found" });
  return res.json({ username: user.username, theme: user.theme });
});

export default router;
