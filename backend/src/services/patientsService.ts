import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";
import { NewPatient, PublicPatient, Patients, Entry } from "../types";
import { assertNever } from "../utils";

const getEntries = (): Patients[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (patient: NewPatient): NewPatient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

const findById = (id: string) => {
  return patientsData.find((patient) => patient.id === id);
};

const addEntry = (patientId: string, entry: Entry) => {

//making sure entry.type exists && if exists mendatory fields of an entry are present in data
  if (!entry.type) {
    throw new Error('diagnoses entry \"type\" missing.');
  } else {
    switch (entry.type) {
      case "HealthCheck": {
        if(!entry.healthCheckRating)
        throw new Error('diagnoses entry \"health check rating\" missing.');
        break;
      }
      case "Hospital": {
        if(!entry.discharge || !entry.discharge.date || !entry.discharge.criteria)
        throw new Error('diagnoses entry \"discharge info (date/criteria)\" missing .');
        break;
      }
      case "OccupationalHealthcare": {
        if(!entry.employerName){
            throw new Error('diagnoses entry \"employer name\" missing.');
        }
        break;
      }
      default: {
        assertNever(entry);
      }
    }
  }
  return findById(patientId)?.entries.push(entry);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
  addNewPatient,
};
