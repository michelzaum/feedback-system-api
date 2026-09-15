import type { Request, Response } from 'express';
import type { SignInUseCase } from "../useCases/signInUseCase";
import type { ISignInRequest } from '../interfaces/ISignInRequest';

export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) { }

  async handle(request: Request<any, any, ISignInRequest>, response: Response) {
    const { email, password } = request.body;

    const token = await this.signInUseCase.execute({ email, password });

    response.json({ token });
  }
}
