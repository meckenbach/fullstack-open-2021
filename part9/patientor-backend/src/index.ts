import express, { RequestHandler } from 'express';
import cors from 'cors';
import diagnosesRoute from './routes/diagnoses';
import patientsRoute from './routes/patients';

const app = express();
const PORT = 3001;

app.use(cors() as RequestHandler);
app.use(express.json());

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRoute);

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});


