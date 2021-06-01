import express from 'express';

const app = express();
const PORT = 3000;

app.get('/hello', (_, res) => {
  res.send('<h1>Hello Full Stack!');
});

app.listen(PORT, () => {
  console.log(`Listenging on http://localhost:${PORT}`);
});
