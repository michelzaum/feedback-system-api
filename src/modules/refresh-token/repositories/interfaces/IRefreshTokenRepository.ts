import type { IRefreshToken } from "../../interfaces/IRefreshToken";
import type { ICreateRefreshTokenRepositoryInput } from "./ICreateRefreshTokenRepository";

export interface IRefreshTokenRepository {
  create(data: ICreateRefreshTokenRepositoryInput): Promise<IRefreshToken>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IRefreshToken | null>;
}
