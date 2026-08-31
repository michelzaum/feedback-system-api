import { FindOrganizationByIdController } from "../controllers/findOrganizationByIdController";
import { PrismaOrganizationRepository } from "../repositories/PrismaOrganizationRepository";
import { FindOrganizationByIdUseCase } from "../useCases/findOrganizationByIdUseCase";

export function makeFindOrganizationByIdController() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository();
  const findOrganizationByIdUseCase = new FindOrganizationByIdUseCase(prismaOrganizationRepository);

  return new FindOrganizationByIdController(findOrganizationByIdUseCase);
}
