import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteIcon from "@mui/icons-material/Favorite";


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export function healthConditionColor(healthRating: number){
    switch (healthRating) {
        case 0: return "green";
        case 1: return "yellow";
        case 2: return "red";
        case 3: return "black";
        default:
            return "grey";
    }
}

export function HealthCheck({ entry }: { entry: HealthCheckEntry }) {
  return (
    <span>
      <p>
        {entry.date} <MonitorHeartIcon />
      </p>
      <i>{entry.description}</i>
      <p><FavoriteIcon style={{color:healthConditionColor(entry.healthCheckRating)}} /></p>
      <p>diagnose by {entry.specialist}</p>
    </span>
  );
}
export function Hospital({ entry }: { entry: HospitalEntry }) {
  return (
    <span>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </span>
  );
}
export function OccupationalHealthcare({ entry }: { entry: OccupationalHealthcareEntry }) {
  return (
    <span>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
    </span>
  );
}

export default function DiagnosesEntry({ entry }: { entry: Entry }) {
    console.log(entry);
    
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
}
