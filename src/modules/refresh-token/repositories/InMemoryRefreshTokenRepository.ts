import type { IRefreshToken } from "../interfaces/IRefreshToken";
import type { ICreateRefreshTokenRepositoryInput } from "./interfaces/ICreateRefreshTokenRepository";
import type { IRefreshTokenRepository } from "./interfaces/IRefreshTokenRepository";

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  private refreshTokens: Map<string, IRefreshToken> = new Map();

  create(data: ICreateRefreshTokenRepositoryInput): Promise<IRefreshToken> {
    const refreshToken: IRefreshToken = {
      id: this.refreshTokens.size.toString(),
      userId: data.userId,
      issuedAt: new Date(),
      expiresAt: data.expiresAt,
    };

    this.refreshTokens.set(refreshToken.id, refreshToken);
    return Promise.resolve(refreshToken);
  }

  delete(id: string): Promise<void> {
    this.refreshTokens.delete(id);
    return Promise.resolve();
  }

  findById(id: string): Promise<IRefreshToken | null> {
    const refreshToken = this.refreshTokens.get(id) || null;
    return Promise.resolve(refreshToken);
  }

  refreshToken(refreshTokenId: string): Promise<IRefreshToken | null> {
    const refreshToken = this.refreshTokens.get(refreshTokenId);

    if (!refreshToken) {
      return Promise.resolve(null);
    }

    if (refreshToken.expiresAt <= new Date()) {
      this.refreshTokens.delete(refreshTokenId);
      return Promise.resolve(null);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const newRefreshToken: IRefreshToken = {
      id: this.refreshTokens.size.toString(),
      userId: refreshToken.userId,
      issuedAt: new Date(),
      expiresAt,
    };

    this.refreshTokens.set(newRefreshToken.id, newRefreshToken);
    return Promise.resolve(newRefreshToken);
  }
}
