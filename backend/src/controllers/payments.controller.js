import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db.js";
import { payments } from "../db/schema/payments.js";

const log = (controllerName, step, message) => {
  console.log(`[${controllerName}] - ${step}: ${message}`);
};

export const getAllPayments = async (req, res) => {
  const controllerName = "getAllPayments";
  log(controllerName, "Start", "Fetching all payments.");
  try {
    const result = await db.select().from(payments);
    log(controllerName, "Success", `Found ${result.length} payments.`);
    res.json(result);
  } catch (error) {
    log(controllerName, "Error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserPayments = async (req, res) => {
  const controllerName = "getUserPayments";
  log(controllerName, "Start", "Fetching user payments.");
  try {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.userId, req.user.userId));
    log(controllerName, "Success", `Found ${result.length} payments.`);
    res.json(result);
  } catch (error) {
    log(controllerName, "Error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPaymentById = async (req, res) => {
  const controllerName = "getPaymentById";
  log(controllerName, "Start", `Fetching payment ${req.params.paymentId}`);
  try {
    res.json(req.payment); // Already fetched by middleware
  } catch (error) {
    log(controllerName, "Error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPayment = async (req, res) => {
  const controllerName = "createPayment";
  log(controllerName, "Start", "Creating payment.");

  try {
    const paymentId = uuidv4();
    const [payment] = await db
      .insert(payments)
      .values({
        paymentId,
        ...req.body,
        // Ensure patients can't set status
        status: req.user.role === "admin" ? req.body.status : "pending",
      })
      .returning();

    log(
      controllerName,
      "Success",
      `Created payment with id: ${payment.paymentId}`
    );
    res.status(201).json(payment);
  } catch (error) {
    log(controllerName, "Error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePayment = async (req, res) => {
  const controllerName = "updatePayment";
  const { paymentId } = req.params;
  log(controllerName, "Start", `Updating payment ${paymentId}`);

  try {
    // Filter updates based on role
    const updates =
      req.user.role === "admin"
        ? req.body
        : {
            method: req.body.method,
            providerRef: req.body.providerRef,
          };

    const [updated] = await db
      .update(payments)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(payments.paymentId, paymentId))
      .returning();

    log(controllerName, "Success", `Updated payment ${paymentId}`);
    res.json(updated);
  } catch (error) {
    log(controllerName, "Error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePayment = async (req, res) => {
  const controllerName = "deletePayment";
  const { paymentId } = req.params;
  log(controllerName, "Start", `Deleting payment ${paymentId}`);

  try {
    await db.delete(payments).where(eq(payments.paymentId, paymentId));

    log(controllerName, "Success", `Deleted payment ${paymentId}`);
    res.status(204).send();
  } catch (error) {
    log(controllerName, "Error", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
