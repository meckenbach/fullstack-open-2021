import { omit } from 'lodash/fp';
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, Gender, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients ;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(omit(['ssn'])) as PublicPatient[];
};

const addPatient = (name: string, gender: Gender, occupation: string, entries: Entry[], dateOfBirth?: string, ssn?: string): Patient => {
  const id = uuid() ;
  const newPatient = {
    id,
    name,
    gender,
    dateOfBirth,
    ssn,
    occupation,
    entries
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addEntry = (patiendId: string, entry: NewEntry): Entry | undefined => {
  const newEntry = {
    ...entry,
    id: uuid()
  };
  const patient = getPatientById(patiendId);
  if (patient) {
    patient.entries.push();
    return newEntry;
  } 
  return undefined;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};
