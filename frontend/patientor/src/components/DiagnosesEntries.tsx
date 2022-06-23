import Typography from "@material-ui/core/Typography";
import React from "react";
// import { useStateValue } from "../state";
import { Entry } from "../types";
import DiagnosesEntry from "./DiagnosesEntry";
import { ErrorRounded } from "@material-ui/icons";

export default function DiagnosesEntries({ entries }: { entries: Entry[] }) {
  // const [{diagnoses}, ] = useStateValue();
  if(entries.length === 0 || !entries) return <p><ErrorRounded style={{color:"gray"}}/> No hospital entries found.</p>;
  return (
    <div>
      <div>
        <Typography variant="h3">entries:</Typography>
      </div>
      <div>
        {entries.map((entry: Entry) => {
          return (
            <div
              key={entry.id}
              style={{
                border: "2px solid #070CA4",
                borderRadius: "5px",
                margin:"2px"
              }}
            >
              {/* <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((diagCode) => {
                return <li key={diagCode}>{diagCode} <span>{diagnoses[diagCode].name}</span></li>;
              })}
            </ul> */}
              <DiagnosesEntry entry={entry} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
