import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: "Too many request attempts, try again later." },
});

app.use(limiter);

app.get("/", (_, res) => {
  res.send("Hello world.");
});

app.listen(3000, () => {
  console.log("App is listening on port: 3000");
});
