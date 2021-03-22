import express from 'express';
import cors from 'cors';
import {jwtAuthenticationMiddleware, isAuthenticatedMiddleware} from "./accounts/middlewares.js";
import {login, signup} from "./accounts/views.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(jwtAuthenticationMiddleware);

app.post('/accounts/login', login);
app.post('/accounts/signup', signup);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api-test', isAuthenticatedMiddleware, (req, res) => {
  res.send({'userId': req.userId});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
