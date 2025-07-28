import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const JWT_ALLOWED_ALGORITHMS = ["HS256", "RS256"]; // Specify algorithms your tokens are signed with

// Imports for database interaction (needed if fetching user from DB after token verification)
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

/**
 * Middleware to authenticate JWT token from Authorization header.
 * Attaches decoded user payload (or full user object from DB) to req.user.
 */
export function authenticateToken(req, res, next) {
  console.log("--- authenticateToken middleware: Starting ---");

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token

  if (!token) {
    console.log("authenticateToken: No token provided.");
    return res.status(401).json({ error: "Authentication token required" });
  }

  // Ensure JWT_SECRET is actually loaded
  if (!JWT_SECRET) {
    console.error(
      "authenticateToken: JWT_SECRET is not defined! Check environment variables."
    );
    // In production, this should ideally cause the app to crash on startup,
    // or you should have a default secret that prompts the dev for setup.
    return res
      .status(500)
      .json({ error: "Server configuration error: JWT secret missing." });
  }

  jwt.verify(
    token,
    JWT_SECRET,
    { algorithms: JWT_ALLOWED_ALGORITHMS },
    async (err, decodedPayload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("authenticateToken: Token expired.");
          return res
            .status(401)
            .json({ error: "Token expired. Please log in again." });
        }
        if (err.name === "JsonWebTokenError") {
          console.log("authenticateToken: Invalid token error.");
          return res
            .status(403)
            .json({ error: "Invalid token. Access denied." });
        }
        console.error(
          "authenticateToken: Unexpected token verification error:",
          err
        );
        return res
          .status(500)
          .json({ error: "Internal server error during authentication." });
      }

      console.log(
        "authenticateToken: Token verified successfully. Decoded payload:",
        decodedPayload
      );

      // --- Critical Security Enhancement: Fetch user from DB after token verification ---
      // This ensures:
      // 1. The user still exists (hasn't been deleted).
      // 2. The user is still active (e.g., not suspended).
      // 3. The user's role hasn't changed since the token was issued.
      // 4. The user is verified (if that's a requirement for authenticated access).
      try {
        if (!decodedPayload || !decodedPayload.userId) {
          console.log("authenticateToken: Decoded payload missing userId.");
          return res.status(403).json({ error: "Invalid token payload." });
        }

        const usersFromDb = await db
          .select()
          .from(users)
          .where(eq(users.userId, decodedPayload.userId));
        const user = usersFromDb[0]; // Drizzle select returns an array

        if (!user) {
          console.log(
            `authenticateToken: User with ID ${decodedPayload.userId} not found in DB.`
          );
          return res
            .status(401)
            .json({ error: "Unauthorized access: User not found." });
        }

        // Optional: Add checks for user status (e.g., isActive, isVerified)
        // if (!user.isActive) {
        //   console.log(`authenticateToken: User ${user.email} is inactive.`);
        //   return res.status(401).json({ error: "Your account is inactive." });
        // }
        // if (!user.isVerified) {
        //   console.log(`authenticateToken: User ${user.email} is not verified.`);
        //   return res.status(401).json({ error: "Please verify your email to access this resource." });
        // }

        // Attach the full, up-to-date user object (without password) to the request
        req.user = { ...user, password: undefined };
        console.log(
          `authenticateToken: User ${req.user.email} successfully authenticated.`
        );
        next(); // Pass control to the next middleware/route handler
      } catch (dbError) {
        console.error(
          "authenticateToken: Database error during user lookup:",
          dbError
        );
        return res
          .status(500)
          .json({ error: "Internal server error during authentication." });
      }
    }
  );
}

/**
 * Middleware to authorize access based on user roles.
 * Must be used after authenticateToken.
 * @param {...string} roles - An array of allowed roles (e.g., 'admin', 'doctor', 'patient').
 * @returns {function} Express middleware function.
 */
export function authorizeRoles(...roles) {
  console.log(
    `--- authorizeRoles middleware: Initialized for roles: [${roles.join(
      ", "
    )}] ---`
  );

  return (req, res, next) => {
    console.log("authorizeRoles: Checking user roles.");

    // Ensure req.user exists and has a role property (set by authenticateToken)
    if (!req.user || !req.user.role) {
      console.warn(
        "authorizeRoles: req.user or req.user.role is missing. Ensure authenticateToken runs first."
      );
      // This case should ideally be caught by authenticateToken, but good for defensive programming.
      return res
        .status(401)
        .json({ error: "Authentication required for role-based access." });
    }

    console.log(`authorizeRoles: Authenticated user role: '${req.user.role}'`);

    if (!roles.includes(req.user.role)) {
      console.log(
        `authorizeRoles: Forbidden - User role '${
          req.user.role
        }' is not in allowed roles [${roles.join(", ")}].`
      );
      return res.status(403).json({ error: "Forbidden: insufficient rights" });
    }

    console.log("authorizeRoles: User role authorized.");
    next(); // User has the required role, proceed to the next middleware/route handler
  };
}
