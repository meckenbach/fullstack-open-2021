import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});
