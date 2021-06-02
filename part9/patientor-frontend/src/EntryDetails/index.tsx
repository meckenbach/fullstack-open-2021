import React from "react";
import HospitalEntryDetails from "./HospitalEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }): JSX.Element => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
  }
};

export default EntryDetails;
