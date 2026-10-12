import { SignInController } from "../controllers/signInController";
import { PrismaUserRepository } from "../../user/repositories/PrismaUserRepository";
import { PrismaRefreshTokenRepository } from "../../refresh-token/repositories/PrismaRefreshTokenRepository";
import { SignInUseCase } from "../useCases/signInUseCase";

export function makeSignInController() {
  const prismaUserRepository = new PrismaUserRepository();
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository();
  const signInUseCase = new SignInUseCase(prismaUserRepository, prismaRefreshTokenRepository);

  return new SignInController(signInUseCase);
}
