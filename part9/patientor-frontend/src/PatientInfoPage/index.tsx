import axios from "axios";
import React from "react";
import { Button, Container, Header, Icon, Loader, SemanticICONS, Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import AddEntryModal from '../AddEntryModal';
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { setPatient, useStateValue, addEntry } from "../state";
import EntryDetails from "../EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


const PatientInfoPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const [{ patient, patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      console.log("patients", patients);
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
    <div className="App">
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfoPage;
