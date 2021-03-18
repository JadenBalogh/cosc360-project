import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api-test', (req, res) => {
  console.log('Hey it works');
  res.send('It worked!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
