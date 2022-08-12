import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_DIAGNOSES_ENTRY";
      patientId: string;
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  console.log(action);

  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnoses) => ({ ...memo, [diagnoses.code]: diagnoses }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_DIAGNOSES_ENTRY": {
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: {
            ...state.patients[action.patientId],
            entries: [
              ...state.patients[action.patientId].entries,
              action.payload
            ],
          },
        },
      };
    }
    default:
      return state;
  }
};

export const setDiagnoses = (listFromApi: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: listFromApi };
};
export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export const addDiagnosesEntry = (
  patientId: string,
  newDiagnosesEntry: Entry
): Action => {
  return { type: "ADD_DIAGNOSES_ENTRY", patientId, payload: newDiagnosesEntry };
};
