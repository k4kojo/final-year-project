import { Router } from "express";

const medicalRecordsRouter = Router();

medicalRecordsRouter.get("/patients/:patientId/medical-records");
medicalRecordsRouter.get("/medical-records/:id");
medicalRecordsRouter.post("/patients/:patientId/medical-records");
medicalRecordsRouter.put("/medical-records/:id");
medicalRecordsRouter.delete("/medical-records/:id");

export default medicalRecordsRouter;
