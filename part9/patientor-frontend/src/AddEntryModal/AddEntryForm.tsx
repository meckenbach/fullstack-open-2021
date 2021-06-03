import React, { SyntheticEvent } from "react";
import { Grid, Button, Form, Select, DropdownProps, Divider } from "semantic-ui-react";
import { Field, Formik, Form as FormikForm, FormikProps } from "formik";
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryFormikForm = ({ onSubmit, onCancel } : Props ) => {
  type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";
  const [entryType, setEntryType] = React.useState<EntryType | "">("");

  const handleChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    switch (data.value) {
    case "HealthCheck":
      setEntryType("HealthCheck");
      break;
    case "Hospital":
      setEntryType("Hospital");
      break;
    case "OccupationalHealthcare":
      setEntryType("OccupationalHealthcare");
      break;
    default:
      setEntryType("");
    }
  };

  const validateEntryFormValues = (values: EntryFormValues) => {
    const requiredError = "Field is required";
    const errors: { [field: string]: string } = {};
    if (!values.date) {
      errors.date = requiredError;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    if (!values.description) {
      errors.description = requiredError;
    }

    if ("discharge" in values) {
      if (!values.discharge.date) {
        errors["discharge.date"] = requiredError;
      }
      if (!values.discharge.criteria) {
        errors["discharge.criteria"] = requiredError;
      }
      return errors;
    }
    
    if ("healthCheckRating" in values) {
      if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
      }
      return errors;
    }

    if (!values.employerName) {
      errors.employerName = requiredError;
    }
    return errors;
  };

  const getInitialEntryFormValues = (): EntryFormValues  => {
    const values = {} as EntryFormValues;

    values.type = entryType || "HealthCheck";
    values.date = "";
    values.specialist = "";
    values.description = "";
    values.diagnosisCodes = [];

    switch (entryType) {
    case "HealthCheck":
      (values as Omit<HealthCheckEntry, "id">).healthCheckRating = HealthCheckRating.Healthy;
      break;
    case "Hospital":
      (values as Omit<HospitalEntry, "id">).discharge = {
        date: "",
        criteria: ""
      };
      break;
    case "OccupationalHealthcare":
      (values as Omit<OccupationalHealthcareEntry, "id">).sickLeave = {
        startDate: "",
        endDate: ""
      };
      break;
    }
    return values;
  };

  const entryTypeOptions = [
    { key: "HealthCheck", value: "HealthCheck", text: "Health Check" },
    { key: "Hospital", value: "Hospital", text: "Hospital" },
    { key: "OccupationalHealthcare", value: "OccupationalHealthcare", text: "Occupational Healthcare" }
  ];
  
  return (
    <>
    <Form className="form ui">
      <Form.Field>
        <label>Entry Type</label>
        <Select placeholder="Select an entry type" options={entryTypeOptions} onChange={handleChange} />
      </Form.Field>
    </Form>
    <Divider />
    {entryType &&
      <Formik<EntryFormValues>
        initialValues={getInitialEntryFormValues()}
        enableReinitialize
        onSubmit={onSubmit}
        validate={validateEntryFormValues}
        component={props => <AddEntryForm onCancel={onCancel} {...props} />}
      />}
    </>
  );
};

interface AddEntryFormProps extends FormikProps<EntryFormValues> {
  onCancel: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onCancel, values, isValid, dirty, setFieldValue, setFieldTouched }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <FormikForm className="form ui">
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
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
      {values.type === "HealthCheck" &&
      <Field
        label="Health Check Rating (0 = Healthy, 1 = Low Risk, 2 = High Risk, 3 = Critical Risk)"
        min={0}
        max={3}
        name="healthCheckRating"
        component={NumberField}
      />}
      {values.type === "Hospital" &&
      <>
        <Field
          label="Date Of Discharge"
          name="discharge.date"
          placeholder="YYYY-MM-DD"
          component={TextField}
        />
        <Field
          label="Criteria"
          name="discharge.criteria"
          placeholder="Criteria"
          component={TextField}
        />
      </>}
      {values.type === "OccupationalHealthcare" &&
      <>
        <Field
          label="Employer Name"
          name="employerName"
          placeholder="Employer Name"
          component={TextField}
        />
        <Field
          label="Sickleave Start Date"
          name="sickLeave.startDate"
          placeholder="YYYY-MM-DD"
          component={TextField}
        />
        <Field
          label="Sickleave End Date"
          name="sickLeave.endDate"
          placeholder="YYYY-MM-DD"
          component={TextField}
        />
      </>}
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={onCancel} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!dirty || !isValid}
          >
            Add
          </Button>
        </Grid.Column>
      </Grid>
    </FormikForm>
  );
};

export default AddEntryFormikForm;
