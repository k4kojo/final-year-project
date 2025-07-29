import { Router } from "express";

const notificationsRouter = Router();

notificationsRouter.get("/users/:userId/notifications");
notificationsRouter.get("/notifications/:id");
notificationsRouter.post("/users/:userId/notifications");
notificationsRouter.put("/notifications/:id");
notificationsRouter.delete("/notifications/:id");

export default notificationsRouter;
