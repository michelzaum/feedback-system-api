import type { Request, Response } from 'express';
import type { SignInUseCase } from "../useCases/signInUseCase";
import type { ISignInRequest } from '../interfaces/ISignInRequest';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from '../../../shared/constants/cookies';

export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) { }

  async handle(request: Request<any, any, ISignInRequest>, response: Response) {
    const { email, password } = request.body;

    const { accessToken, refreshTokenId } = await this.signInUseCase.execute({ email, password });

    response.status(200)
      .cookie('token', accessToken, accessTokenCookieOptions)
      .cookie('refreshToken', refreshTokenId, refreshTokenCookieOptions)
      .json({ message: 'sign-in successful' });
  }
}
