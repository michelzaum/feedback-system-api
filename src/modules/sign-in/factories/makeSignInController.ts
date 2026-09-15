import { SignInController } from "../controllers/signInController";
import { PrismaUserRepository } from "../../user/repositories/PrismaUserRepository";
import { SignInUseCase } from "../useCases/signInUseCase";

export function makeSignInController() {
  const prismaUserRepository = new PrismaUserRepository();
  const signInUseCase = new SignInUseCase(prismaUserRepository);

  return new SignInController(signInUseCase);
}
