import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import introductionRoutes from "./routes/introduction.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config({
  path: "../.env",
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/introduction", introductionRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 3000;

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
