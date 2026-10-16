import { FindProjectBySlugController } from "../controllers/findProjectBySlugController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { FindProjectBySlugUseCase } from "../useCases/findProjectBySlugUseCase";

export function makeFindProjectBySlugController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findProjectBySlugUseCase = new FindProjectBySlugUseCase(prismaProjectRepository, prismaMembershipRepository);

  return new FindProjectBySlugController(findProjectBySlugUseCase);
}
