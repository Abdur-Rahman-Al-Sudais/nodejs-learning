import { Router } from "express";
import { existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

// JSON file store
const DB_FILE = join(__dirname, "todos.json");

function readDB() {
  if (!existsSync(DB_FILE)) {
    const seed = {
      nextId: 3,
      todos: [
        { id: 1, title: "Buy groceries", completed: false },
        { id: 2, title: "Walk the dog", completed: true },
      ],
    };
    writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(readFileSync(DB_FILE, "utf-8"));
}

function writeDB(data) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Routes

// GET /todos — list all todos
router.get("/todos", (req, res) => {
  const { todos } = readDB();
  res.json(todos);
});

// GET /todos/:id — get a single todo
router.get("/todos/:id", (req, res) => {
  const { todos } = readDB();
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST /todos — create a new todo
router.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const db = readDB();
  const todo = { id: db.nextId++, title, completed: false };
  db.todos.push(todo);
  writeDB(db);
  res.status(201).json(todo);
});

// PATCH /todos/:id — partially update a todo
router.patch("/todos/:id", (req, res) => {
  const db = readDB();
  const todo = db.todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  writeDB(db);
  res.json(todo);
});

// DELETE /todos/:id — delete a todo
router.delete("/todos/:id", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  db.todos.splice(index, 1);
  writeDB(db);
  res.status(204).send();
});

// DELETE /todos — delete all todos
router.delete("/todos", (req, res) => {
  const db = readDB();
  db.todos = [];
  writeDB(db);
  res.status(204).send();
});

export default router;
