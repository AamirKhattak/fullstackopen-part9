import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, DiagnosesEntryTypeOption } from "./FormField";
import { DiagnosesEntryType, Gender, Patient } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const diagnosesEntryTypeOptions: DiagnosesEntryTypeOption[] = [
  {value: DiagnosesEntryType.HealthCheckEntry, label: "HealthCheck"},
  {value: DiagnosesEntryType.HospitalEntry, label: "Hospital"},
  {value: DiagnosesEntryType.OccupationalHealthcareEntry, label: "OccupationalHealthcare"}
];

export const AddDiagnosesEntryForm = ({ onSubmit, onCancel }: Props) => {

  const onChangeDiagnosesEntryType = (event: Event) => console.log(event?.target,'onChangeDiagnosesEntryType');

  return (
    <Formik
      initialValues={{
        descrition: "",
        date: "",
        specialist: "",
        diagnosesCode: "",
        diagnosesEntryType: DiagnosesEntryType.HealthCheckEntry,
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
            <SelectField label="Diagnoses Entry Type" name="diagnosesEntryType" options={diagnosesEntryTypeOptions} onChangeOption={onChangeDiagnosesEntryType}/>
            
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
