import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserRepository } from "../../user/repositories/interfaces/IUserRepository";
import type { IRefreshTokenRepository } from "../../refresh-token/repositories/interfaces/IRefreshTokenRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ISignInRequest } from "../interfaces/ISignInRequest";
import type { ISignInResponse } from "../interfaces/ISignInResponse";

const EXPIRATION_TIME_IN_DAYS = 7;

export class SignInUseCase implements IUseCase<ISignInRequest, ISignInResponse> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) { }

  async execute(data: ISignInRequest): Promise<ISignInResponse> {
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

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRATION_TIME_IN_DAYS);

    const refreshToken = await this.refreshTokenRepository.create({ userId: user.id, expiresAt });

    return { accessToken, refreshTokenId: refreshToken.id };
  }
}
