import { FindProjectByOrganizationController } from "../controllers/findProjectByOrganizationController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { FindProjectByOrganizationUseCase } from "../useCases/findProjectByOrganizationUseCase";

export function makeFindProjectByOrganizationController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findProjectByOrganizationUseCase = new FindProjectByOrganizationUseCase(prismaProjectRepository, prismaMembershipRepository);

  return new FindProjectByOrganizationController(findProjectByOrganizationUseCase);
}
