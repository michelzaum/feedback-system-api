import { FindProjectByIdController } from "../controllers/findProjectByIdController";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { FindProjectByIdUseCase } from "../useCases/findProjectByIdUseCase";

export function makeFindProjectByIdController() {
  const prismaProjectRepository = new PrismaProjectRepository();
  const findProjectByIdUseCase = new FindProjectByIdUseCase(prismaProjectRepository);

  return new FindProjectByIdController(findProjectByIdUseCase);
}
