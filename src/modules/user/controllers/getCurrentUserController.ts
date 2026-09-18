import type { Request, Response } from "express";
import type { GetCurrentUserUseCase } from "../useCases/getCurrentUserUseCase";
import type { IUser } from "../interfaces/IUser";

export class GetCurrentUserController {
  constructor(private readonly getCurrentUserUseCase: GetCurrentUserUseCase) {}

  async handle(request: Request, response: Response) {
    const userId = request.userId;

    try {
      const user = await this.getCurrentUserUseCase.execute(userId!);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.json(user);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
