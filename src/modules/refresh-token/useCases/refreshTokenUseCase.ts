import jwt from "jsonwebtoken";
import type { IRefreshTokenResponse } from "../interfaces/IRefreshTokenResponse";
import type { IRefreshTokenRepository } from "../repositories/interfaces/IRefreshTokenRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

const EXPIRATION_TIME_IN_DAYS = 7;

export class RefreshTokenUseCase extends BaseUseCase<string, IRefreshTokenResponse> {
  constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {
    super();
  }

  protected async executeInternal(refreshTokenId: string): Promise<IRefreshTokenResponse> {
    const newRefreshToken = await this.refreshTokenRepository.refreshToken(refreshTokenId);

    if (!newRefreshToken) {
      throw new Error("Invalid or expired refresh token");
    }

    const accessToken = jwt.sign(
      { userId: newRefreshToken.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { accessToken, refreshTokenId: newRefreshToken.id };
  }
}
