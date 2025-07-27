import express from "express";

import userRoutes from "./routes/usersRoute.js";

import { PORT } from "./config/env.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
