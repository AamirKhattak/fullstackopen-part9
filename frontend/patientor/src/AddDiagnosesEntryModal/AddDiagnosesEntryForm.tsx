import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption } from "./FormField";
import {
  DiagnosesEntryType,
  Gender,
  healthCheckRating,
  Patient,
} from "../types";
// import { Hospital } from "../components/DiagnosesEntry";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const ratingOptions: TypeOption[] = [
  { value: healthCheckRating.Healthy, label: "Healthy" },
  { value: healthCheckRating.LowRisk, label: "LowRisk" },
  { value: healthCheckRating.HighRisk, label: "HighRisk" },
  { value: healthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

const diagnosesEntryTypeOptions: TypeOption[] = [
  { value: DiagnosesEntryType.HealthCheckEntry, label: "HealthCheck" },
  { value: DiagnosesEntryType.HospitalEntry, label: "Hospital" },
  {
    value: DiagnosesEntryType.OccupationalHealthcareEntry,
    label: "OccupationalHealthcare",
  },
];

const getInputFieldsByDiagnosesEntryTypeOption = (
  diagnosesEntryType: string
) => {
  switch (diagnosesEntryType) {
    case "HealthCheck":
      return (
        <SelectField
          label="Diagnoses Entry Type"
          name="diagnosesEntryType"
          options={ratingOptions}
        />
      );
    case "Hospital":
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="EmployerName"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </>
      );

    default:
      return null;
  }
};

export const AddDiagnosesEntryForm = ({ onSubmit, onCancel }: Props) => {

  const [currentDiagnosesEntryType, setCurrentDiagnosesEntryType] = useState('');

  const onChangeDiagnosesEntryType = (event: React.ChangeEvent<HTMLInputElement>) =>{
    console.log(event?.target, "onChangeDiagnosesEntryType");
    if(event.target.value !== undefined){
        console.log(event.target.value);
        setCurrentDiagnosesEntryType(event.target.value);
    }
  };

  return (
    <Formik
      initialValues={{
        descrition: "",
        date: "",
        specialist: "",
        diagnosesCode: "",
        // diagnosesEntryType: DiagnosesEntryType.OccupationalHealthcareEntry,
        name: "",
        ssn: "",
        dateOfBirth: "",
        occupation: "",
        gender: Gender.Other,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="DiagnosesCode-TODO"
              placeholder="diagnosesCode TODO TODO"
              name="diagnosesCode"
              component={TextField}
            />
            <SelectField
              label="Diagnoses Entry Type"
              name="diagnosesEntryType"
              options={diagnosesEntryTypeOptions}
              onChangeOption={onChangeDiagnosesEntryType}
            />
            {getInputFieldsByDiagnosesEntryTypeOption(
              currentDiagnosesEntryType
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddDiagnosesEntryForm;
