import { FindProjectByIdController } from "../controllers/findProjectByIdController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { FindProjectByIdUseCase } from "../useCases/findProjectByIdUseCase";

export function makeFindProjectByIdController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findProjectByIdUseCase = new FindProjectByIdUseCase(prismaProjectRepository, prismaMembershipRepository);

  return new FindProjectByIdController(findProjectByIdUseCase);
}
