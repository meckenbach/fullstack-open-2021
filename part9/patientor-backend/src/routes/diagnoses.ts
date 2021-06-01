import express from 'express';
import diagnosesService from '../services/diagnosesService';

const route = express.Router();

route.get('/', (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

export default route;
