import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteUser } from "../interfaces/IDeleteUser";

export class DeleteUserUseCase implements IUseCase<IDeleteUser, void> {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: IDeleteUser): Promise<void> {
    const userExists = await this.userRepository.findById(data.id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(data.id);
  }
}
