import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getDiagnoses = () => {
  return diagnoses as Array<Diagnosis>;
};

export default {
  getDiagnoses
};
