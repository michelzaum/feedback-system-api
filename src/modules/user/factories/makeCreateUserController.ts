import { CreateUserController } from "../controllers/createUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { CreateUserUseCase } from "../useCases/createUserUseCase";

export function makeCreateUserController() {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

  return new CreateUserController(createUserUseCase);
}
