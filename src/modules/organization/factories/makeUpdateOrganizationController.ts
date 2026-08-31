import { UpdateOrganizationController } from "../controllers/updateOrganizationController";
import { PrismaOrganizationRepository } from "../repositories/PrismaOrganizationRepository";
import { UpdateOrganizationUseCase } from "../useCases/updateOrganizationUseCase";

export function makeUpdateOrganizationController() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository();
  const updateOrganizationUseCase = new UpdateOrganizationUseCase(prismaOrganizationRepository);

  return new UpdateOrganizationController(updateOrganizationUseCase);
}
