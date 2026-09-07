import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IGetUser } from "../interfaces/IGetUser";
import type { IUser } from "../interfaces/IUser";

export class GetUserUseCase implements IUseCase<IGetUser, IUser | null> {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: IGetUser): Promise<IUser | null> {
    return await this.userRepository.findById(data.id);
  }
}
