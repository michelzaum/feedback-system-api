import { FindProjectBySlugController } from "../controllers/findProjectBySlugController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { FindProjectBySlugUseCase } from "../useCases/findProjectBySlugUseCase";

export function makeFindProjectBySlugController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const findProjectBySlugUseCase = new FindProjectBySlugUseCase(prismaProjectRepository);

  return new FindProjectBySlugController(findProjectBySlugUseCase);
}
