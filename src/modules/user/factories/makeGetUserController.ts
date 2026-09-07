import { GetUserController } from "../controllers/getUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { GetUserUseCase } from "../useCases/getUserUseCase";

export function makeGetUserController() {
  const prismaUserRepository = new PrismaUserRepository();
  const getUserUseCase = new GetUserUseCase(prismaUserRepository);

  return new GetUserController(getUserUseCase);
}
