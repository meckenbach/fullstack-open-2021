import Ajv from 'ajv';
import NewPatientSchema from './schemas/NewPatient.json';
import NewEntrySchema from './schemas/NewEntry.json';
import { NewEntry, NewPatient } from '../types';

const ajv = new Ajv();

export const validateNewPatient = ajv.compile<NewPatient>(NewPatientSchema);
export const validateNewEntry = ajv.compile<NewEntry>(NewEntrySchema);
