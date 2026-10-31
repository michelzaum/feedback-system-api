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
    const refreshToken = await this.refreshTokenRepository.findById(refreshTokenId);

    if (!refreshToken) {
      throw new Error("Invalid refresh token");
    }

    if (refreshToken.expiresAt <= new Date()) {
      await this.refreshTokenRepository.delete(refreshToken.id);
      throw new Error("Expired refresh token");
    }

    await this.refreshTokenRepository.delete(refreshToken.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRATION_TIME_IN_DAYS);

    const newRefreshToken = await this.refreshTokenRepository.create({ userId: refreshToken.userId, expiresAt });

    const accessToken = jwt.sign({ userId: refreshToken.userId }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return { accessToken, refreshTokenId: newRefreshToken.id };
  }
}
