import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/PatientUtils";
import { Request } from "express";
import { toNewEntry } from "../utils/EntryUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req: Request<{ id: string }>, res) => {
  const id = req.params.id;

  try {
    res.send(patientService.getPatientById(id));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req: Request<{ id: string }>, res) => {
  const id = req.params.id;

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntries(newEntry, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
