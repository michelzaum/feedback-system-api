import { prisma } from "../../../lib/prisma";
import type { IRefreshToken } from "../interfaces/IRefreshToken";
import type { ICreateRefreshTokenRepositoryInput } from "./interfaces/ICreateRefreshTokenRepository";
import type { IRefreshTokenRepository } from "./interfaces/IRefreshTokenRepository";

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
    return await prisma.refreshToken.findUnique({
      where: { id },
    });
  }
}
