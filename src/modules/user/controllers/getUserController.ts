import type { Request, Response } from "express";
import type { GetUserUseCase } from "../useCases/getUserUseCase";
import type { IGetUserRequest } from "./interfaces/IGetUserRequest";

export class GetUserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) { }

  async handle(request: Request<any, any, IGetUserRequest>, response: Response) {
    const { id } = request.params;

    try {
      const user = await this.getUserUseCase.execute({ id });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.json(user);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
