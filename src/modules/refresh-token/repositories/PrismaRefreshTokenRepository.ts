import { prisma } from "../../../lib/prisma";
import type { IRefreshToken } from "../interfaces/IRefreshToken";
import type { ICreateRefreshTokenRepositoryInput } from "./interfaces/ICreateRefreshTokenRepository";
import type { IRefreshTokenRepository } from "./interfaces/IRefreshTokenRepository";

const EXPIRATION_TIME_IN_DAYS = 7;

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async create(data: ICreateRefreshTokenRepositoryInput): Promise<IRefreshToken> {
    return prisma.refreshToken.create({
      data: {
        userId: data.userId,
        expiresAt: data.expiresAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<IRefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { id },
    });
  }

  async refreshToken(refreshTokenId: string): Promise<IRefreshToken | null> {
    return prisma.$transaction(
      async (tx) => {
        const refreshToken = await tx.refreshToken.findUnique({
          where: { id: refreshTokenId },
        });

        if (!refreshToken) {
          return null;
        }

        if (refreshToken.expiresAt <= new Date()) {
          await tx.refreshToken.delete({
            where: { id: refreshToken.id },
          });
          return null;
        }

        await tx.refreshToken.delete({
          where: { id: refreshToken.id },
        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + EXPIRATION_TIME_IN_DAYS);

        const newRefreshToken = await tx.refreshToken.create({
          data: {
            userId: refreshToken.userId,
            expiresAt,
          },
        });

        return newRefreshToken;
      }
    );
  }
}
