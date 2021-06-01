import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Listenging on http://localhost:${PORT}`);
});
