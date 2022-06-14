import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiBaseUrlPatients } from "../constants";
import { Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    console.log(id);

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrlPatients}/${String(id)}`
        );
        console.log(data);
        setPatient(data);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }

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
        <Typography variant="h6">{patient.name}   {getGenderIcon(patient.gender)}</Typography>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
      </Box>
    </div>
  );
};

export default PatientDetails;
