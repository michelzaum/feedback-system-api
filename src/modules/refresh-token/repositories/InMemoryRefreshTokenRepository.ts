import type { IRefreshToken } from "../interfaces/IRefreshToken";
import type { ICreateRefreshTokenRepositoryInput } from "./interfaces/ICreateRefreshTokenRepository";
import type { IRefreshTokenRepository } from "./interfaces/IRefreshTokenRepository";

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  private refreshTokens: IRefreshToken[] = [];

  create(data: ICreateRefreshTokenRepositoryInput): Promise<IRefreshToken> {
    const refreshToken: IRefreshToken = {
      id: this.refreshTokens.length.toString(),
      userId: data.userId,
      issuedAt: new Date(),
      expiresAt: data.expiresAt,
    };

    this.refreshTokens.push(refreshToken);
    return Promise.resolve(refreshToken);
  }

  delete(id: string): Promise<void> {
    this.refreshTokens = this.refreshTokens.filter((item) => item.id !== id);
    return Promise.resolve();
  }

  findById(id: string): Promise<IRefreshToken | null> {
    const refreshToken = this.refreshTokens.find((item) => item.id === id) || null;
    return Promise.resolve(refreshToken);
  }
}
