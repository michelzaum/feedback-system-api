import { CreateProjectController } from "../controllers/createProjectController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { CreateProjectUseCase } from "../useCases/createProjectUseCase";

export function makeCreateProjectController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const createProjectUseCase = new CreateProjectUseCase(prismaProjectRepository, prismaMembershipRepository);

  return new CreateProjectController(createProjectUseCase);
}
