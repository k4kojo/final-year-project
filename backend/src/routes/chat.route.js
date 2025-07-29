import { Router } from "express";

const chatRouter = Router();

chatRouter.get("chat-rooms/:roomId/messages", (req, res) => {});
chatRouter.get("/chat-rooms/:roomId/messages/:messageId", (req, res) => {});
chatRouter.post("/chat-rooms/:roomId/messages", (req, res) => {});
chatRouter.put("/chat-messages/:id", (req, res) => {});
chatRouter.delete("/chat-messages/:id", (req, res) => {});

export default chatRouter;
