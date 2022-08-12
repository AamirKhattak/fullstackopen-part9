import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  SelectField,
  TypeOption,
  DiagnosisSelection,
} from "./FormField";
import { BaseEntry, DiagnosesEntryType, healthCheckRating } from "../types";
import { useStateValue } from "../state";
// import { Hospital } from "../components/DiagnosesEntry";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

//TODO: https://github.com/PCianes/FullStackOpen/blob/master/part9/patientor/client/src/AddPatientModal/AddPatientForm.tsx
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export interface DiagnosesEntryFormValues extends Omit<BaseEntry, "id"> {
  type: string;
  healthCheckRating?: healthCheckRating;
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
}

interface Props {
  onSubmit: (values: DiagnosesEntryFormValues) => void;
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
          label="HealthCheck Rating"
          name="healthCheckRating"
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
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: `Desciption test ${(new Date()).toString()}`,
        date: new Date().toISOString().split('T')[0],
        specialist: "Dr. John Doe",
        type: "HealthCheck",
        healthCheckRating: healthCheckRating.LowRisk,
        diagnosisCodes: ['J06.9', 'Z57.1'],
        dischargeCriteria: "Too fat to be placed in hospital",
        dischargeDate: new Date().toISOString().split('T')[0],
        employerName: "Papa Princess/Prince",
        sickLeaveEndDate: new Date().toISOString().split('T')[0],
        sickLeaveStartDate: new Date().toISOString().split('T')[0]
      }}
      onSubmit={onSubmit}
      // validate={(values) => {
      //   const requiredError = "Field is required";
      //   const errors: { [field: string]: string } = {};
      //   if (!values.name) {
      //     errors.name = requiredError;
      //   }
      //   if (!values.ssn) {
      //     errors.ssn = requiredError;
      //   }
      //   if (!values.dateOfBirth) {
      //     errors.dateOfBirth = requiredError;
      //   }
      //   if (!values.occupation) {
      //     errors.occupation = requiredError;
      //   }
      //   return errors;
      // }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Diagnoses Entry Type"
              name="type"
              options={diagnosesEntryTypeOptions}
              // onChangeOption={onChangeDiagnosesEntryType}
            />
            {getInputFieldsByDiagnosesEntryTypeOption(values.type)}
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
