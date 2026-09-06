import { hash } from "bcrypt";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateUser } from "../interfaces/ICreateUser";
import type { IUser } from "../interfaces/IUser";

export class CreateUserUseCase implements IUseCase<ICreateUser, IUser> {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: ICreateUser): Promise<IUser> {
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
