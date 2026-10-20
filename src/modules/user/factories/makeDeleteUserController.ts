import { DeleteUserController } from "../controllers/deleteUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase";

export function makeDeleteUserController() {
  const prismaUserRepository = new PrismaUserRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository, prismaMembershipRepository);

  return new DeleteUserController(deleteUserUseCase);
}
