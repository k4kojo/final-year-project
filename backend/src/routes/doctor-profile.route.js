import { Router } from "express";

const doctorProfileRouter = Router();

doctorProfileRouter.get("/doctors");
doctorProfileRouter.get("/doctors/:id");
doctorProfileRouter.post("/doctors");
doctorProfileRouter.put("/doctors/:id");
doctorProfileRouter.delete("/doctors/:id");

export default doctorProfileRouter;
