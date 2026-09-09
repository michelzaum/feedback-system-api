import { DeleteUserController } from "../controllers/deleteUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase";

export function makeDeleteUserController() {
  const prismaUserRepository = new PrismaUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);

  return new DeleteUserController(deleteUserUseCase);
}
