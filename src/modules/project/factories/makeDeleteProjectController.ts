import { DeleteProjectController } from "../controllers/deleteProjectController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { DeleteProjectUseCase } from "../useCases/deleteProjectUseCase";

export function makeDeleteProjectController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const deleteProjectUseCase = new DeleteProjectUseCase(prismaProjectRepository);

  return new DeleteProjectController(deleteProjectUseCase);
}
