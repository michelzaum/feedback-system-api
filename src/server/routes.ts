import 'dotenv/config'

import express from 'express';
import { makeCreateOrganizationController } from '../modules/organization/factories/makeCreateOrganizationController';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.post('/organizations', async (req, res) => makeCreateOrganizationController().handle(req, res));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
