import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiBaseUrlDiagnoses, apiBaseUrlPatients } from "../constants";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { updatePatient, useStateValue } from "../state";
import DiagnosesEntries from "../components/DiagnosesEntries";
import { setDiagnoses as setDiagnoses_State } from "../state";
import { Button } from "@mui/material";

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        let patientDetails;
        if (patients && patients[String(id)].ssn) {
          patientDetails = patients[String(id)];
        } else {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrlPatients}/${String(id)}`
          );
          patientDetails = data;
          dispatch(updatePatient(patientDetails));
        }
        setPatient(patientDetails);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();

    const fetchDiagnoses = async () => {
      try {
        let diagnosesEntries;
        if (!diagnoses) {
          const { data } = await axios.get<Diagnosis[]>(apiBaseUrlDiagnoses);
          diagnosesEntries = data;
          dispatch(setDiagnoses_State(diagnosesEntries));
          setDiagnoses(diagnosesEntries);
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [id, diagnoses]);

  // useEffect(() => {

  // }),[diagnoses];

  if (!patient) {
    return null;
  }

  const openModal = () => true;

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Box>
      <Typography align="center" variant="h6">
              Patient list
            </Typography>
        <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">
              {patient.name} {getGenderIcon(patient.gender)}
            </Typography>
            <Typography variant="body1">ssn: {patient.ssn}</Typography>
            <Typography variant="body1">
              occupation: {patient.occupation}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="secondary" onClick={() => openModal()}>
              Add Diagnoses
            </Button>
          </Box>
        </Box>
        <Typography variant="body1">
          <DiagnosesEntries entries={patient.entries} />
        </Typography>
      </Box>
    </div>
  );
};

export default PatientDetails;
