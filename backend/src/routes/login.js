import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Set in .env for production

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user.length)
    return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user[0].password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  // Don't include password in token payload
  const token = jwt.sign(
    { userId: user[0].userId, email: user[0].email, role: user[0].role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { ...user[0], password: undefined } });
};
