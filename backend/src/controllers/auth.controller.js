import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { signInSchema, signUpSchema } from "../validators/authSchema.js";

// Create user
export const signUp = async (req, res) => {
  try {
    console.log("--- Starting signUp request ---"); // Step 1

    const parsed = signUpSchema.safeParse(req.body);
    console.log("1. Zod schema parsing attempted."); // Step 2

    if (!parsed.success) {
      console.log("1.1. Validation failed. Errors:", parsed.error.errors);
      return res.status(400).json({ error: parsed.error.errors });
    }
    console.log("1.2. Request body validated successfully."); // Step 3

    const { firstName, lastName, email, password, phoneNumber, role } =
      parsed.data;
    console.log("2. Extracted user data from validated request body."); // Step 4
    // console.log("Extracted data:", { firstName, lastName, email, phoneNumber, role }); // Uncomment for more detail, but be mindful of sensitive data in logs

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    console.log("3. Checked for existing user by email."); // Step 5

    if (existingUser.length > 0) {
      console.log("3.1. User with this email already exists:", email);
      return res.status(409).json({ error: "Email already exists" });
    }
    console.log("3.2. Email is unique, proceeding with new user creation."); // Step 6

    const userId = uuidv4();
    console.log("4. Generated new userId:", userId); // Step 7

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("5. Generated password salt and hashed password."); // Step 8

    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
    console.log("6. Generated email verification token and expiry."); // Step 9

    const newUsers = await db
      .insert(users)
      .values({
        userId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        role,
        verificationToken,
        verificationTokenExpiry,
        isVerified: false, // Assuming you have this field in your Drizzle schema
        createdAt: new Date(), // Assuming you have this field in your Drizzle schema
        updatedAt: new Date(), // Assuming you have this field in your Drizzle schema
      })
      .returning(); // This should return the inserted row(s)
    console.log("7. User data inserted into database. Result:", newUsers); // Step 10

    // IMPORTANT: Drizzle's .returning() usually returns an array of objects.
    // Ensure newUsers[0] is not undefined and has the 'id' property if that's what your schema uses.
    // If your Drizzle schema uses 'userId' as the primary key and it's returned, use newUsers[0].userId
    // If your Drizzle schema automatically generates an 'id' (e.g., auto-incrementing) and returns it, use newUsers[0].id
    console.log("8. Attempting to generate JWT."); // Step 11
    console.log("   - JWT_SECRET loaded:", !!JWT_SECRET); // Check if JWT_SECRET is truthy
    console.log("   - JWT_EXPIRES_IN loaded:", !!JWT_EXPIRES_IN); // Check if JWT_EXPIRES_IN is truthy
    console.log("   - newUsers[0] object:", newUsers[0]);
    // Double-check if newUsers[0].id or newUsers[0].userId exists based on your schema
    console.log(
      "   - Value for JWT payload userId:",
      newUsers[0]?.userId || newUsers[0]?.id
    );

    const payload = {
      userId: newUsers[0].userId,
      email: newUsers[0].email,
      role: newUsers[0].role, // <--- This line is critical
      isVerified: newUsers[0].isVerified,
    };

    // The error might be here if newUsers[0] is undefined or newUsers[0].id is missing
    const token = jwt.sign(
      payload, // Use userId or id based on your actual Drizzle schema
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    console.log("9. JWT generated successfully."); // Step 12
    // console.log("Generated Token (first 20 chars):", token.substring(0, 20) + "..."); // Don't log full token in production logs

    // Send verificationToken to user's email (this would be an external service call in production)
    console.log("10. Preparing response to client."); // Step 13
    res.status(201).json({
      message: "User created. Please verify your email.",
      // For demo only, don't send in production! The actual email verification link should be sent via an email service.
      verificationToken,
      user: {
        userId: newUsers[0].userId, // Or newUsers[0].id
        firstName: newUsers[0].firstName,
        lastName: newUsers[0].lastName,
        email: newUsers[0].email,
        phoneNumber: newUsers[0].phoneNumber,
        role: newUsers[0].role,
        isVerified: newUsers[0].isVerified, // Assuming this field exists and is returned
        // Do NOT include password or hashed password in the response!
      },
      token, // The generated JWT
    });
    console.log("11. Response sent to client."); // Step 14
  } catch (error) {
    console.error("--- Caught error in signUp function ---"); // Crucial for debugging
    if (error.code === "23505") {
      // PostgreSQL unique violation error code
      console.error(
        "Error type: Database unique constraint violation (e.g., email already exists)."
      );
      console.error("Error message:", error.message);
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("Error type: Unexpected internal server error.");
    console.error("Error details:", error); // Log the full error object
    console.error("Error message:", error.message); // Log just the message
    console.error("Error stack:", error.stack); // Log the stack trace to find the exact line
    res.status(500).json({ error: "Internal server error" });
  }
};

// Email verification
export const verifyEmail = async (req, res) => {
  try {
    console.log("--- Starting verifyEmail request ---"); // Log 1

    const { token } = req.query;
    if (!token) {
      console.log("1. Verification token not provided in query."); // Log 2
      return res.status(400).json({ error: "Verification token required" });
    }
    console.log(`2. Received verification token: ${token.substring(0, 10)}...`); // Log 3

    const user = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token));
    console.log("3. Database query for user by verification token completed."); // Log 4

    if (!user.length) {
      console.log(`3.1. No user found for token: ${token.substring(0, 10)}...`); // Log 5
      return res.status(400).json({ error: "Invalid verification token" });
    }
    console.log(`3.2. User found for verification: ${user[0].email}`); // Log 6

    if (user[0].isVerified) {
      console.log(`4. User ${user[0].email} is already verified.`); // Log 7
      return res.json({ message: "Email already verified" });
    }
    console.log("5. User is not yet verified."); // Log 8

    // Use current time in Ghana for comparison if needed, but Date.now() is GMT/UTC
    // const currentTime = new Date();
    // if (user[0].verificationTokenExpiry < currentTime) {
    if (user[0].verificationTokenExpiry < new Date()) {
      // Compares to current time in UTC
      console.log(`6. Verification token for ${user[0].email} has expired.`); // Log 9
      return res.status(400).json({ error: "Verification token expired" });
    }
    console.log("7. Verification token is valid and not expired."); // Log 10

    await db
      .update(users)
      .set({
        isVerified: true,
        verificationToken: null, // Clear token after use
        verificationTokenExpiry: null, // Clear expiry after use
        updatedAt: new Date(), // Update timestamp
      })
      .where(eq(users.userId, user[0].userId)); // Use userId for specific update
    console.log(`8. User ${user[0].email} marked as verified in DB.`); // Log 11

    res.json({ message: "Email verified successfully" });
    console.log("--- verifyEmail request completed successfully ---"); // Log 12
  } catch (error) {
    console.error("--- Caught error in verifyEmail function ---");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
export const signIn = async (req, res) => {
  try {
    console.log("--- Starting signIn request ---"); // Log 1

    const parsed = signInSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("1. Sign-in validation failed. Errors:", parsed.error.errors); // Log 2
      return res.status(400).json({ error: parsed.error.errors });
    }
    console.log("2. Request body validated successfully."); // Log 3

    const { email, password } = parsed.data;
    console.log(`3. Attempting to sign in user with email: ${email}`); // Log 4

    const user = await db.select().from(users).where(eq(users.email, email));
    console.log("4. Database query for user by email completed."); // Log 5

    if (!user.length) {
      console.log(`4.1. User not found for email: ${email}`); // Log 6
      return res.status(401).json({ error: "Invalid credentials" }); // Use generic message for security
    }
    console.log("4.2. User found in database."); // Log 7

    // Assuming user[0] is the user object from Drizzle's `select().returning()`
    // Add null/undefined checks for properties if not guaranteed by Drizzle or schema
    if (!user[0].isVerified) {
      console.log(`5. User email not verified for: ${email}`); // Log 8
      return res.status(401).json({ error: "Email not verified" });
    }
    console.log("6. User email is verified."); // Log 9

    const valid = await bcrypt.compare(password, user[0].password);
    console.log("7. Password comparison completed. Is password valid?", valid); // Log 10

    if (!valid) {
      console.log(`7.1. Invalid password for user: ${email}`); // Log 11
      return res.status(401).json({ error: "Invalid credentials" }); // Use generic message for security
    }
    console.log("7.2. Password is valid."); // Log 12

    // JWT Generation for successful sign-in
    console.log("8. Generating JWT."); // Log 13
    console.log("   - JWT_SECRET loaded:", !!JWT_SECRET);
    console.log("   - JWT_EXPIRES_IN loaded:", !!JWT_EXPIRES_IN);

    const token = jwt.sign(
      { userId: user[0].userId, email: user[0].email, role: user[0].role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } // Use the configured expiration time
    );
    console.log("9. JWT generated successfully."); // Log 14

    // Respond with token and user data (without password)
    console.log("10. Sending success response."); // Log 15
    res.json({ token, user: { ...user[0], password: undefined } });
    console.log("--- signIn request completed successfully ---"); // Log 16
  } catch (error) {
    console.error("--- Caught error in signIn function ---"); // Log for errors
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  try {
    console.log("--- Starting requestPasswordReset request ---"); // Log 1

    const { email } = req.body;
    if (!email) {
      console.log("1. Email not provided for password reset request."); // Log 2
      return res.status(400).json({ error: "Email required" });
    }
    console.log(`2. Password reset requested for email: ${email}`); // Log 3

    const user = await db.select().from(users).where(eq(users.email, email));
    console.log("3. Database query for user by email completed."); // Log 4

    if (!user.length) {
      console.log(`3.1. User not found for password reset: ${email}`); // Log 5
      // For security, often respond with a generic message like "If a user with that email exists..."
      return res.status(404).json({ error: "User not found" });
    }
    console.log(`3.2. User found for password reset: ${user[0].email}`); // Log 6

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min from now
    console.log("4. Generated password reset token and expiry."); // Log 7

    await db
      .update(users)
      .set({ resetToken, resetTokenExpiry, updatedAt: new Date() }) // Update timestamp
      .where(eq(users.userId, user[0].userId));
    console.log(
      `5. Password reset token saved to DB for user: ${user[0].email}`
    ); // Log 8

    // --- IMPORTANT SECURITY NOTE ---
    // In a production application, you should *never* send the resetToken directly
    // in the API response. Instead, you would send an email to the user
    // containing a link with this token (e.g., yourfrontend.com/reset-password?token=XYZ).
    console.log("6. Sending response (DEVELOPMENT ONLY: resetToken included)."); // Log 9
    res.json({
      message: "Password reset token generated. Check your email.",
      resetToken,
    }); // For demo/testing only
    // You would typically call an email service here:
    // await sendPasswordResetEmail(user[0].email, resetToken);
    console.log("--- requestPasswordReset request completed successfully ---"); // Log 10
  } catch (error) {
    console.error("--- Caught error in requestPasswordReset function ---");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    console.log("--- Starting resetPassword request ---"); // Log 1

    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      console.log("1. Token or new password not provided."); // Log 2
      return res.status(400).json({ error: "Token and new password required" });
    }
    // You might want to add validation for newPassword's complexity here too (e.g., Zod)
    console.log(`2. Received reset token: ${token.substring(0, 10)}...`); // Log 3

    const user = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token));
    console.log("3. Database query for user by reset token completed."); // Log 4

    if (!user.length) {
      console.log(
        `3.1. No user found for reset token: ${token.substring(0, 10)}...`
      ); // Log 5
      return res.status(400).json({ error: "Invalid or expired token" }); // Generic message for security
    }
    console.log(`3.2. User found for password reset: ${user[0].email}`); // Log 6

    // Use current time in Ghana for comparison if needed, but Date.now() is GMT/UTC
    // const currentTime = new Date();
    // if (user[0].resetTokenExpiry < currentTime) {
    if (user[0].resetTokenExpiry < new Date()) {
      // Compares to current time in UTC
      console.log(`4. Reset token for ${user[0].email} has expired.`); // Log 7
      return res.status(400).json({ error: "Invalid or expired token" }); // Generic message for security
    }
    console.log("5. Reset token is valid and not expired."); // Log 8

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash with salt rounds (10)
    console.log("6. New password hashed."); // Log 9

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null, // Clear token after use
        resetTokenExpiry: null, // Clear expiry after use
        updatedAt: new Date(), // Update timestamp
      })
      .where(eq(users.userId, user[0].userId)); // Ensure specific user update
    console.log(
      `7. User ${user[0].email}'s password updated and tokens cleared.`
    ); // Log 10

    res.json({ message: "Password reset successful" });
    console.log("--- resetPassword request completed successfully ---"); // Log 11
  } catch (error) {
    console.error("--- Caught error in resetPassword function ---");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
// Only admin can access (enforced in route)
export const getAllUsers = async (req, res) => {
  try {
    console.log("--- Starting getAllUsers request (Admin access) ---"); // Log 1

    // Assuming authorizeRoles('admin') middleware has already ensured admin access.
    const allUsers = await db.select().from(users);
    console.log(`1. Fetched ${allUsers.length} users from the database.`); // Log 2

    // Map through users to remove sensitive password field
    const usersWithoutPasswords = allUsers.map((u) => ({
      ...u,
      password: undefined,
    }));
    console.log("2. Removed password field from user objects."); // Log 3

    res.json(usersWithoutPasswords);
    console.log("--- getAllUsers request completed successfully ---"); // Log 4
  } catch (error) {
    console.error("--- Caught error in getAllUsers function ---");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by userId
export const getUserById = async (req, res) => {
  try {
    console.log("--- Starting getUserById request ---"); // Log 1

    const { id } = req.params;
    console.log(`1. Attempting to get user by ID: ${id}`); // Log 2

    const user = await db.select().from(users).where(eq(users.userId, id));
    console.log("2. Database query for user by ID completed."); // Log 3

    if (user.length === 0) {
      console.log(`2.1. User not found for ID: ${id}`); // Log 4
      return res.status(404).json({ error: "User not found" });
    }
    console.log(`2.2. User found: ${user[0].email}`); // Log 5

    const userWithoutPassword = { ...user[0], password: undefined };
    res.json(userWithoutPassword); // Remove password
    console.log("--- getUserById request completed successfully ---"); // Log 6
  } catch (error) {
    console.error("--- Caught error in getUserById function ---");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user by userId
export const updateUserById = async (req, res) => {
  try {
    console.log("--- Starting updateUserById request ---"); // Log 1

    const { id } = req.params;
    console.log(`1. Attempting to update user with ID: ${id}`); // Log 2

    // --- IMPORTANT SECURITY CHECK ---
    // If this route is protected by `authenticateToken`, you should verify
    // that `req.user.userId === id` unless the `req.user.role` is 'admin'.
    // Example:
    // if (req.user.role !== 'admin' && req.user.userId !== id) {
    //     console.log(`User ${req.user.userId} attempted to update user ${id} without permission.`);
    //     return res.status(403).json({ error: "Forbidden: You can only update your own profile." });
    // }
    // --- End Security Check ---

    // Optional: Use a Zod schema for partial updates if you want more validation
    // const parsed = updateUserSchema.safeParse(req.body);
    // if (!parsed.success) {
    //   console.log("1.1. Update validation failed. Errors:", parsed.error.errors);
    //   return res.status(400).json({ error: parsed.error.errors });
    // }
    // const updateData = parsed.data;

    const { firstName, lastName, email, phoneNumber } = req.body;
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    // Prevent direct update of sensitive fields like password, role, isVerified via this endpoint
    // delete updateData.password;
    // delete updateData.role;
    // delete updateData.isVerified;
    // ... any other fields not meant for direct user update

    if (Object.keys(updateData).length === 0) {
      console.log("2. No valid fields provided for update."); // Log 3
      return res.status(400).json({ error: "No valid fields to update" });
    }
    console.log("3. Update data prepared:", updateData); // Log 4

    const result = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() }) // Update timestamp
      .where(eq(users.userId, id))
      .returning();
    console.log("4. Database update query completed."); // Log 5

    if (result.length === 0) {
      console.log(`4.1. User not found for update with ID: ${id}`); // Log 6
      return res.status(404).json({ error: "User not found" });
    }
    console.log(`4.2. User ${result[0].email} updated successfully.`); // Log 7

    res.json({
      message: "User updated successfully",
      user: { ...result[0], password: undefined },
    }); // Remove password
    console.log("--- updateUserById request completed successfully ---"); // Log 8
  } catch (error) {
    console.error("--- Caught error in updateUserById function ---");
    if (error.code === "23505") {
      // PostgreSQL unique violation error code
      console.error(
        "Error type: Database unique constraint violation (e.g., email already exists)."
      );
      console.error("Error message:", error.message);
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("Error type: Unexpected internal server error.");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete user by userId
export const deleteUserById = async (req, res) => {
  try {
    console.log("--- Starting deleteUserById request ---"); // Log 1

    const { id } = req.params;
    console.log(`1. Attempting to delete user with ID: ${id}`); // Log 2

    // --- IMPORTANT SECURITY CHECK ---
    // This route should be highly protected.
    // Usually, only an 'admin' role should be able to delete other users.
    // A regular user might only be allowed to delete their *own* account:
    // if (req.user.role !== 'admin' && req.user.userId !== id) {
    //     console.log(`User ${req.user.userId} attempted to delete user ${id} without permission.`);
    //     return res.status(403).json({ error: "Forbidden: You can only delete your own profile." });
    // }
    // --- End Security Check ---

    const result = await db
      .delete(users)
      .where(eq(users.userId, id))
      .returning(); // Returning the deleted user(s) is helpful to confirm deletion
    console.log("2. Database delete query completed."); // Log 3

    if (result.length === 0) {
      console.log(`2.1. User not found for deletion with ID: ${id}`); // Log 4
      return res.status(404).json({ error: "User not found" });
    }
    console.log(
      `2.2. User ${result[0].email || result[0].userId} deleted successfully.`
    ); // Log 5

    res.json({ message: "User deleted successfully" });
    console.log("--- deleteUserById request completed successfully ---"); // Log 6
  } catch (error) {
    console.error("--- Caught error in deleteUserById function ---");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};
