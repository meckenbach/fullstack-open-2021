import { omit } from 'lodash/fp';
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.json';
import { Patient, NonSensitivePatient, Gender } from '../types';

const getPatients = (): Patient[] => {
  return patients as Patient[];
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(omit(['ssn'])) as NonSensitivePatient[];
};

const addPatient =(name: string, gender: Gender, dateOfBirth: string, ssn: string, occupation: string) => {
  const id = uuid() ;
  const newPatient = {
    id,
    name,
    gender,
    dateOfBirth,
    ssn,
    occupation
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
