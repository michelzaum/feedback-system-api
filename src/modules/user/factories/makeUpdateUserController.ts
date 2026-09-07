import { UpdateUserController } from "../controllers/updateUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { UpdateUserUseCase } from "../useCases/updateUserUseCase";

export function makeUpdateUserController() {
  const prismaUserRepository = new PrismaUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository);

  return new UpdateUserController(updateUserUseCase);
}
