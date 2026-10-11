import { UpdateProjectController } from "../controllers/updateProjectController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { UpdateProjectUseCase } from "../useCases/updateProjectUseCase";

export function makeUpdateProjectController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const updateProjectUseCase = new UpdateProjectUseCase(prismaProjectRepository, prismaMembershipRepository);

  return new UpdateProjectController(updateProjectUseCase);
}
