import { hash } from "bcrypt";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateUser } from "../interfaces/IUpdateUser";
import type { IUser } from "../interfaces/IUser";
import type { ICreateUserRepositoryInput } from "../repositories/interfaces/ICreateUserRepository";

export class UpdateUserUseCase implements IUseCase<IUpdateUser, IUser | undefined> {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: IUpdateUser): Promise<IUser | undefined> {
    const userExists = await this.userRepository.findById(data.id);

    if (!userExists) {
      throw new Error("User not found");
    }

    const updateData: Partial<ICreateUserRepositoryInput> = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.email !== undefined) {
      updateData.email = data.email;
    }

    if (data.password !== undefined) {
      updateData.password_hash = await hash(data.password, 10);
    }

    return await this.userRepository.update(data.id, updateData);
  }
}
