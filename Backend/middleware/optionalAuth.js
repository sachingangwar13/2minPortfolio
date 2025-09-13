import jwt from "jsonwebtoken";

export default function optionalAuth(req, _res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = {
      id: payload._id,
      username: payload.username,
      email: payload.email,
    };
  } catch {}
  next();
}
