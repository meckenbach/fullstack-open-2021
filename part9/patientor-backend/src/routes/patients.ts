import express from 'express';
import patientsService from '../services/patientsService';
import { validateNewEntry, validateNewPatient } from '../validators';

const route = express.Router();

route.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitivePatients());
});

// interface ErrorResponse {
//   error: string
// }

route.post('/', (req, res) => {
  if (validateNewPatient(req.body)) {
    const { name, dateOfBirth, gender, ssn, occupation, entries } = req.body;
    const addedPatient = patientsService.addPatient(name, gender, occupation, entries, dateOfBirth, ssn);
    res.json(addedPatient);
  } else {
    res
      .status(400)
      .json({ error: "Incorrect or missing field"});
  }
});

route.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);
  patient
    ? res.json(patient)
    : res.status(404).end();
});

route.post('/:id/entries', (req, res) => {
  const patiendId = req.params.id;
  if (validateNewEntry(req.body)) {
    const newEntry = req.body;
    const addedEntry = patientsService.addEntry(patiendId, newEntry);
    addedEntry
      ? res.json(addedEntry)
      : res.status(404).end();
  } else {
    console.log(validateNewEntry.errors);
    res
      .status(400)
      .json({ error: "Incorrect or missing field"});
  }
});


export default route;
