import express from "express";

import authRouter from "./routes/auth.route.js";

import { PORT } from "./config/env.js";
import appointmentRouter from "./routes/appointment.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.use("/api/health-app/auth", authRouter);
app.use("/api/health-app/appointments", appointmentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
