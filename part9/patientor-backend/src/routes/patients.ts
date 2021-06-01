import express, { Request } from 'express';
import { Patient, NewPatient } from '../types';
import patientsService from '../services/patientsService';
import { validate, ValidationError }  from 'jsonschema';
import NewPatientSchema from '../schemas/NewPatient.json';

const route = express.Router();

route.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitivePatients());
});

interface ErrorResponse {
  error: string
}

route.post('/', (req: Request<Record<string, never>, Patient | ErrorResponse, NewPatient>, res) => {
  try {
    validate(req.body, NewPatientSchema, { throwError: true });
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    const addedPatient = patientsService.addPatient(name, gender, dateOfBirth, ssn, occupation);
    res.json(addedPatient);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: `Incorrect or missing field: ${err.argument}`});
    }
  } 
});


export default route;
