import { prisma } from "../../../lib/prisma";
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
    const result = await prisma.$transaction(
      async (tx) => {
        const refreshToken = await tx.refreshToken.findUnique({
          where: { id: refreshTokenId },
        });

        if (!refreshToken) {
          throw new Error("Invalid refresh token");
        }

        if (refreshToken.expiresAt <= new Date()) {
          await tx.refreshToken.delete({ where: { id: refreshToken.id } });
          throw new Error("Expired refresh token");
        }

        await tx.refreshToken.delete({ where: { id: refreshToken.id } });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + EXPIRATION_TIME_IN_DAYS);

        const newRefreshToken = await tx.refreshToken.create({
          data: { userId: refreshToken.userId, expiresAt },
        });

        const accessToken = jwt.sign(
          { userId: refreshToken.userId },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );

        return { accessToken, refreshTokenId: newRefreshToken.id };
      }
    );

    return result;
  }
}
