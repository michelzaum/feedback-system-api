import { RefreshTokenController } from "../controllers/refreshTokenController";
import { PrismaRefreshTokenRepository } from "../repositories/PrismaRefreshTokenRepository";
import { RefreshTokenUseCase } from "../useCases/refreshTokenUseCase";

export function makeRefreshTokenController() {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository();
  const refreshTokenUseCase = new RefreshTokenUseCase(prismaRefreshTokenRepository);

  return new RefreshTokenController(refreshTokenUseCase);
}
