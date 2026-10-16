import { FindProjectBySlugsController } from "../controllers/findProjectBySlugsController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { FindProjectBySlugsUseCase } from "../useCases/findProjectBySlugsUseCase";

export function makeFindProjectBySlugsController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const findProjectBySlugsUseCase = new FindProjectBySlugsUseCase(prismaProjectRepository);

  return new FindProjectBySlugsController(findProjectBySlugsUseCase);
}
