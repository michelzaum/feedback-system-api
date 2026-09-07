import 'dotenv/config';

import express from 'express';
import { makeCreateOrganizationController } from '../modules/organization/factories/makeCreateOrganizationController';
import { makeUpdateOrganizationController } from '../modules/organization/factories/makeUpdateOrganizationController';
import { makeFindOrganizationByIdController } from '../modules/organization/factories/makeFindOrganizationByIdController';
import { makeDeleteOrganizationController } from '../modules/organization/factories/makeDeleteOrganizationController';
import { makeCreateUserController } from '../modules/user/factories/makeCreateUserController';
import { makeUpdateUserController } from '../modules/user/factories/makeUpdateUserController';
import { makeGetUserController } from '../modules/user/factories/makeGetUserController';
import { makeDeleteUserController } from '../modules/user/factories/makeDeleteUserController';
import { makeCreateMembershipController } from '../modules/membership/factories/makeCreateMembershipController';
import { makeFindMembershipController } from '../modules/membership/factories/makeFindMembershipController';
import { makeUpdateMembershipController } from '../modules/membership/factories/makeUpdateMembershipController';
import { makeDeleteMembershipController } from '../modules/membership/factories/makeDeleteMembershipController';

const app = express();

app.use(express.json());

app.post('/organizations', async (req, res) => makeCreateOrganizationController().handle(req, res));
app.put('/organizations/:id', async (req, res) => makeUpdateOrganizationController().handle(req, res));
app.get('/organizations/:id', async (req, res) => makeFindOrganizationByIdController().handle(req, res));
app.delete('/organizations/:id', async (req, res) => makeDeleteOrganizationController().handle(req, res));

app.post('/users', async (req, res) => makeCreateUserController().handle(req, res));
app.patch('/users/:id', async (req, res) => makeUpdateUserController().handle(req, res));
app.get('/users/:id', async (req, res) => makeGetUserController().handle(req, res));
app.delete('/users/:id', async (req, res) => makeDeleteUserController().handle(req, res));

app.post('/organizations/:organizationId/memberships', async (req, res) => makeCreateMembershipController().handle(req, res));
app.get('/organizations/:organizationId/memberships/:userId', async (req, res) => makeFindMembershipController().handle(req, res));
app.patch('/organizations/:organizationId/memberships/:userId', async (req, res) => makeUpdateMembershipController().handle(req, res));
app.delete('/organizations/:organizationId/memberships/:userId', async (req, res) => makeDeleteMembershipController().handle(req, res));


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
