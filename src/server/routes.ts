import 'dotenv/config'

import express from 'express';
import { CreateOrganizationController } from '../modules/organization/controllers/createOrganizationController';
import { PrismaOrganizationRepository } from '../modules/organization/repositories/PrismaOrganizationRepository';
import { CreateOrganizationUseCase } from '../modules/organization/useCases/createOrganizationUseCase';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.post('/organizations', async (req, res) => {
  const prismaOrganizationRepository = new PrismaOrganizationRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(prismaOrganizationRepository);
  const createOrganizationController = new CreateOrganizationController(createOrganizationUseCase)

  await createOrganizationController.handle(req, res);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
