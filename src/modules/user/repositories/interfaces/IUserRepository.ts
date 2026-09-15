import type { IUser } from "../../interfaces/IUser";
import type { ICreateUserRepositoryInput } from "./ICreateUserRepository";

export interface IUserRepository {
  create(data: ICreateUserRepositoryInput): Promise<IUser>;
  update(
    id: string,
    data: Partial<ICreateUserRepositoryInput>,
  ): Promise<IUser | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
}
