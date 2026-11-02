import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUser } from "../interfaces/IUser";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class GetCurrentUserUseCase extends BaseUseCase<string, IUser | null> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  protected async executeInternal(userId: string): Promise<IUser | null> {
    return await this.userRepository.findById(userId);
  }
}
