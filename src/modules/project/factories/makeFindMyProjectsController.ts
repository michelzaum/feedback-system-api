import { FindMyProjectsController } from "../controllers/findMyProjectsController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { FindMyProjectsUseCase } from "../useCases/findMyProjectsUseCase";

export function makeFindMyProjectsController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const findMyProjectsUseCase = new FindMyProjectsUseCase(prismaProjectRepository);

  return new FindMyProjectsController(findMyProjectsUseCase);
}
