import type { Request, Response } from 'express';
import type { CreateUserUseCase } from "../useCases/createUserUseCase";
import type { ICreateUserRequest } from './interfaces/ICreateUserRequest';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  async handle(request: Request<any, any, ICreateUserRequest>, response: Response) {
    const { name, email, password } = request.body;

    const user = await this.createUserUseCase.execute({ name, email, password });

    response.json(user);
  }
}
