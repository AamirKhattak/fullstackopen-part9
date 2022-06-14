import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});
patientsRouter.get("/:id", (req, res) => {
  
  const {id} = req.params;
  console.log(id);
  let patient = patientsService.findById(id);
  // if(patient?.entries === undefined){
  //   patient?.entries = [];
  // }
  res.send(patient);
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const savedPatient = patientsService.addEntry(newPatient);
    res.json(savedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default patientsRouter;
