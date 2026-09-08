import { CreateProjectController } from "../controllers/createProjectController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { CreateProjectUseCase } from "../useCases/createProjectUseCase";

export function makeCreateProjectController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const createProjectUseCase = new CreateProjectUseCase(prismaProjectRepository);

  return new CreateProjectController(createProjectUseCase);
}
