import { Diagnose } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getDiagnoses = () => {
  return diagnoses as Array<Diagnose>;
};

export default {
  getDiagnoses
};
