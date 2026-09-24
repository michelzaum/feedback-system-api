import type { Request, Response } from 'express';

export class SignOutController {
  constructor() { }

  async handle(request: Request, response: Response) {
    response.clearCookie('token').json({ message: 'sign-out successful' });
  }
}
