import { DeleteOrganizationController } from "../controllers/deleteOrganizationController";
import { PrismaOrganizationRepository } from "../repositories/PrismaOrganizationRepository";
import { DeleteOrganizationUseCase } from "../useCases/deleteOrganizationUseCase";

export function makeDeleteOrganizationController() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository();
  const deleteOrganizationUseCase = new DeleteOrganizationUseCase(prismaOrganizationRepository);

  return new DeleteOrganizationController(deleteOrganizationUseCase);
}
