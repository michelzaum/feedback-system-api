import type { Request, Response } from "express";
import type { UpdateUserUseCase } from "../useCases/updateUserUseCase";
import type { IUpdateUserRequestParams } from "./interfaces/IUpdateUserRequestParams";
import type { IUpdateUserRequestBody } from "./interfaces/IUpdateUserRequestBody";

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) { }

  async handle(request: Request<IUpdateUserRequestParams, any, IUpdateUserRequestBody>, response: Response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    try {
      const user = await this.updateUserUseCase.execute({
        id,
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(password !== undefined && { password }),
      });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.json(user);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
