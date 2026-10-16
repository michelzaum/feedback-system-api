import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUser } from "../interfaces/IUser";

export class GetCurrentUserUseCase implements IUseCase<string, IUser | null> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IUser | null> {
    return await this.userRepository.findById(userId);
  }
}
