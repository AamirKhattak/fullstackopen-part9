import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res)=>{
    res.send(diagnosesService.getDiagnoses());
})

diagnosesRouter.post('/', (_req, res) => {
    res.send('saving a diagnoses');
})

export default diagnosesRouter;