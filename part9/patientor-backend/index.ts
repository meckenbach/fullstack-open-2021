import express from 'express';

const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});
