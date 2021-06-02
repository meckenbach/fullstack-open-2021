import axios from "axios";
import React from "react";
import { Container, Header, Icon, Loader, SemanticICONS, Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatient, useStateValue } from "../state";
import EntryDetails from "../EntryDetails";


const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setPatient(patientFromApi));
    };
    if (!patient || patient.id !== id) void fetchPatient();
  });

  if (patient === null) return <Loader>Loading</Loader>;

  const iconName = {
    "male": "mars",
    "female": "venus",
    "other": "genderless"
  }[patient.gender] as SemanticICONS;

  return (
    <Container>
      <Header as="h2">{patient.name}<Icon name={iconName} /></Header>
      <Container>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </Container>
      <Divider />
      <Container>
        <Header as="h3">Entries:</Header>
        <>
          {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
        </>
      </Container>
    </Container>
  );
};

export default PatientInfoPage;
