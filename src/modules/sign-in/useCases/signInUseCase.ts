import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserRepository } from "../../user/repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ISignInRequest } from "../interfaces/ISignInRequest";

export class SignInUseCase implements IUseCase<ISignInRequest, string> {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: ISignInRequest): Promise<string> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password_hash) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return token;
  }
}
