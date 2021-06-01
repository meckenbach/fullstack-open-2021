import express, { Request, Response, NextFunction} from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, ExercisesResult } from './exerciseCalculator';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res
      .status(400)
      .json({
        error: 'malformatted parameters'
      });
  }
  return res
    .status(200)
    .json({
      height,
      weight,
      bmi: calculateBmi(height, weight)
    });
});

interface ExercisesRequestBody {
  daily_exercises: number[],
  target: number
}

app.post('/exercises', (req: Request<Record<string, never>, ExercisesResult, ExercisesRequestBody>, res, next: NextFunction) => {
  try {
    const { daily_exercises, target } = req.body;
    const result = calculateExercises(daily_exercises, target);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

interface Error {
  status?: number;
  message?: string;
  name?: string;
}

interface ErrorResponse {
  error: string
}

app.use((err: Error, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
  switch (err.name) {
  case 'SyntaxError':
  case 'MalformattedParameterError':
    return res.status(400).json({ error: 'malformatted parameters'});
  case 'MissingParameterError':
    return res.status(400).json({ error: 'missing parameters'});
  default:
    return res.status(400).json({ error: 'unkown error'});
  }
});


app.listen(PORT, () => {
  console.log(`Listenging on http://localhost:${PORT}`);
});
