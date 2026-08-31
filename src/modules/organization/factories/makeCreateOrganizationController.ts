import { CreateOrganizationController } from "../controllers/createOrganizationController";
import { PrismaOrganizationRepository } from "../repositories/PrismaOrganizationRepository";
import { CreateOrganizationUseCase } from "../useCases/createOrganizationUseCase";

export function makeCreateOrganizationController() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(prismaOrganizationRepository);

  return new CreateOrganizationController(createOrganizationUseCase);
}
