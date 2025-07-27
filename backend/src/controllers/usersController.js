import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { userRegisterSchema } from "../validators/userSchema.js";

// Create user
export const createUser = async (req, res) => {
  try {
    const parsed = userRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    const { firstName, lastName, email, password, phoneNumber } = parsed.data;
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    const result = await db
      .insert(users)
      .values({
        userId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        verificationToken,
        verificationTokenExpiry,
      })
      .returning();

    // Send verificationToken to user's email
    res.status(201).json({
      message: "User created. Please verify your email.",
      verificationToken, // For demo only, don't send in production!
      user: { ...result[0], password: undefined },
    });
  } catch (error) {
    if (error.code === "23505") {
      console.error("Create user error:", error);
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// Email verification
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Token required" });
  const user = await db
    .select()
    .from(users)
    .where(eq(users.verificationToken, token));
  if (!user.length) return res.status(400).json({ error: "Invalid token" });
  if (user[0].isVerified) return res.json({ message: "Already verified" });
  if (user[0].verificationTokenExpiry < new Date())
    return res.status(400).json({ error: "Token expired" });

  await db
    .update(users)
    .set({
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    })
    .where(eq(users.userId, user[0].userId));
  res.json({ message: "Email verified successfully" });
};

// Login
export const loginUser = async (req, res) => {
  const parsed = userLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }
  const { email, password } = parsed.data;
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user.length)
    return res.status(401).json({ error: "Invalid credentials" });
  if (!user[0].isVerified)
    return res.status(401).json({ error: "Email not verified" });

  const valid = await bcrypt.compare(password, user[0].password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user[0].userId, email: user[0].email, role: user[0].role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token, user: { ...user[0], password: undefined } });
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user.length) return res.status(404).json({ error: "User not found" });

  const resetToken = uuidv4();
  const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min

  await db
    .update(users)
    .set({ resetToken, resetTokenExpiry })
    .where(eq(users.userId, user[0].userId));

  // Send resetToken to user's email
  res.json({ message: "Password reset token generated.", resetToken }); // For demo only
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ error: "Token and new password required" });

  const user = await db.select().from(users).where(eq(users.resetToken, token));
  if (!user.length) return res.status(400).json({ error: "Invalid token" });
  if (user[0].resetTokenExpiry < new Date())
    return res.status(400).json({ error: "Token expired" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db
    .update(users)
    .set({ password: hashedPassword, resetToken: null, resetTokenExpiry: null })
    .where(eq(users.userId, user[0].userId));

  res.json({ message: "Password reset successful" });
};

// Get all users
// Only admin can access (enforced in route)
export const getAllUsers = async (req, res) => {
  // Only admin can access (enforced in route)
  const allUsers = await db.select().from(users);
  res.json(allUsers.map((u) => ({ ...u, password: undefined })));
};

// Get user by userId
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.select().from(users).where(eq(users.userId, id));
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user by userId
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;
    // Only update provided fields
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.userId, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", user: result[0] });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete user by userId
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db
      .delete(users)
      .where(eq(users.userId, id))
      .returning();
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
