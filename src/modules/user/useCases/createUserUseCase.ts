import { hash } from "bcrypt";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateUser } from "../interfaces/ICreateUser";
import type { IUser } from "../interfaces/IUser";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class CreateUserUseCase extends BaseUseCase<ICreateUser, IUser> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  protected async executeInternal(data: ICreateUser): Promise<IUser> {
    const { name, email, password } = data;

    const hashedPassword = await hash(password, 10);

    const newUser = {
      name,
      email,
      password_hash: hashedPassword,
    };

    return await this.userRepository.create(newUser);
  }
}
