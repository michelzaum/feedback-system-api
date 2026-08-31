import 'dotenv/config'

import express from 'express';
import { makeCreateOrganizationController } from '../modules/organization/factories/makeCreateOrganizationController';
import { makeUpdateOrganizationController } from '../modules/organization/factories/makeUpdateOrganizationController';
import { makeFindOrganizationByIdController } from '../modules/organization/factories/makeFindOrganizationByIdController';
import { makeDeleteOrganizationController } from '../modules/organization/factories/makeDeleteOrganizationController';

const app = express();

app.use(express.json());

app.post('/organizations', async (req, res) => makeCreateOrganizationController().handle(req, res));
app.put('/organizations/:id', async (req, res) => makeUpdateOrganizationController().handle(req, res));
app.get('/organizations/:id', async (req, res) => makeFindOrganizationByIdController().handle(req, res));
app.delete('/organizations/:id', async (req, res) => makeDeleteOrganizationController().handle(req, res));


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
