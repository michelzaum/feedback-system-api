import { UpdateProjectController } from "../controllers/updateProjectController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { UpdateProjectUseCase } from "../useCases/updateProjectUseCase";

export function makeUpdateProjectController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const updateProjectUseCase = new UpdateProjectUseCase(prismaProjectRepository);

  return new UpdateProjectController(updateProjectUseCase);
}
