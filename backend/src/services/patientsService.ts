import { v1 as uuid } from 'uuid';

import patientsData from "../../data/patients"
import { NewPatient, PublicPatient, Patients, Entry } from "../types"

const getEntries = ():Patients[] => {
    return patientsData;
}

const getNonSensitiveEntries = (): PublicPatient[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation})=>({id, name, dateOfBirth, gender, occupation}))
}

const addNewPatient = (patient: NewPatient): NewPatient => {
    const id = uuid();
    const newPatient = {
        id, ...patient
    }

    patientsData.push(newPatient)
    return newPatient;
}

const findById = (id:string) => {
    return patientsData.find( (patient) => patient.id === id)
}

const addEntry  = (patientId:string, entry:Entry ) => {
    console.log(patientId, entry);
    patientsData

    
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    findById,
    addNewPatient
  }