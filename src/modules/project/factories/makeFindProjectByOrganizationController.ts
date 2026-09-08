import { FindProjectByOrganizationController } from "../controllers/findProjectByOrganizationController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { FindProjectByOrganizationUseCase } from "../useCases/findProjectByOrganizationUseCase";

export function makeFindProjectByOrganizationController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const findProjectByOrganizationUseCase = new FindProjectByOrganizationUseCase(prismaProjectRepository);

  return new FindProjectByOrganizationController(findProjectByOrganizationUseCase);
}
