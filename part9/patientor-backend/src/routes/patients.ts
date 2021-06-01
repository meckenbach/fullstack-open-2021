import express from 'express';
import patientsService from '../services/patientsService';

const route = express.Router();

route.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitivePatients());
});

export default route;
