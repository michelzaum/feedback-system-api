import type { IRefreshToken } from "../../interfaces/IRefreshToken";
import type { ICreateRefreshTokenRepositoryInput } from "../interfaces/ICreateRefreshTokenRepository";

export interface IRefreshTokenRepository {
  create(data: ICreateRefreshTokenRepositoryInput): Promise<IRefreshToken>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IRefreshToken | null>;
  refreshToken(refreshTokenId: string, expirationTimeInDays: number): Promise<IRefreshToken | null>;
}
