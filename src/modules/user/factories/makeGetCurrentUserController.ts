import { GetCurrentUserController } from "../controllers/getCurrentUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { GetCurrentUserUseCase } from "../useCases/getCurrentUserUseCase";

export function makeGetCurrentUserController() {
  const prismaUserRepository = new PrismaUserRepository();
  const getCurrentUserUseCase = new GetCurrentUserUseCase(prismaUserRepository);

  return new GetCurrentUserController(getCurrentUserUseCase);
}
