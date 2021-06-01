import { omit } from 'lodash/fp';
import patients from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
  return patients as Patient[];
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(omit(['ssn'])) as NonSensitivePatient[];
};

export default {
  getPatients,
  getNonSensitivePatients
};
