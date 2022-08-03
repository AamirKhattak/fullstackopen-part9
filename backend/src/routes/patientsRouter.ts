import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let patient = patientsService.findById(id);
  res.send(patient);
});


patientsRouter.get("/:id/entries", (_req, res) => {
  res.send('ping poong');
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const updatedPatient = patientsService.addEntry(req.params.id, req.body);
    res.json(updatedPatient);
  } catch (error) {
    if(error instanceof Error){
      res.status(400).send(error.message);
    }
  }
  

  res.send('ping poong');
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const savedPatient = patientsService.addNewPatient(newPatient);
    res.json(savedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default patientsRouter;
