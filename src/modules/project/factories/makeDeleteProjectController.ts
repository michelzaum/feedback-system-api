import { DeleteProjectController } from "../controllers/deleteProjectController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { DeleteProjectUseCase } from "../useCases/deleteProjectUseCase";

export function makeDeleteProjectController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const deleteProjectUseCase = new DeleteProjectUseCase(prismaProjectRepository, prismaMembershipRepository);

  return new DeleteProjectController(deleteProjectUseCase);
}
