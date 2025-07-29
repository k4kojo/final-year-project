import { Router } from "express";

const chatRoomsRouter = Router();

chatRoomsRouter.get("/chat-rooms", (req, res) => {});
chatRoomsRouter.get("/chat-rooms?userId={id}", (req, res) => {});
chatRoomsRouter.get("/chat-rooms/:id", (req, res) => {});
chatRoomsRouter.post("/chat-rooms", (req, res) => {});
chatRoomsRouter.put("/chat-rooms/:id", (req, res) => {});
chatRoomsRouter.delete("/chat-rooms/:id", (req, res) => {});

export default chatRoomsRouter;
