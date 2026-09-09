import type { Request, Response } from "express";
import type { DeleteProjectUseCase } from "../useCases/deleteProjectUseCase";
import type { IDeleteProjectRequest } from "./interfaces/IDeleteProjectRequest";

export class DeleteProjectController {
  constructor(private readonly deleteProjectUseCase: DeleteProjectUseCase) { }

  async handle(request: Request<any, any, IDeleteProjectRequest>, response: Response) {
    const { id } = request.params;

    try {
      await this.deleteProjectUseCase.execute({ id });
      return response.status(204).send();
    } catch (error: any) {
      if (error.message === "Project not found") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
