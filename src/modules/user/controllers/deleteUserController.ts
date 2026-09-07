import type { Request, Response } from "express";
import type { DeleteUserUseCase } from "../useCases/deleteUserUseCase";
import type { IDeleteUserRequest } from "./interfaces/IDeleteUserRequest";

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) { }

  async handle(request: Request<any, any, IDeleteUserRequest>, response: Response) {
    const { id } = request.params;

    try {
      await this.deleteUserUseCase.execute({ id });

      return response.status(204).send();
    } catch (error: any) {
      if (error.message === "User not found") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
