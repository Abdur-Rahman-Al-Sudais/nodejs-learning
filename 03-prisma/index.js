import express from "express";
import { prisma } from "./lib/prisma.js";

import "dotenv/config";

const app = express();

app.use(express.json());

// Get all users
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  res.json(users);
});

// Create a new user
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
});

// Get all posts
app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  res.json(posts);
});

// Create a post
app.post("/api/posts", async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await prisma.post.create({
    data: { title, content, authorId },
  });
  res.json(post);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
