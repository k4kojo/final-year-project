import express from "express";

import authRouter from "./routes/auth.route.js";

import { PORT } from "./config/env.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.use("/api/health-app/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
