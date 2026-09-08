import type { Request, Response } from "express";
import type { UpdateProjectUseCase } from "../useCases/updateProjectUseCase";
import type { IUpdateProjectRequestParams } from "./interfaces/IUpdateProjectRequestParams";
import type { IUpdateProjectRequestBody } from "./interfaces/IUpdateProjectRequestBody";

export class UpdateProjectController {
  constructor(private readonly updateProjectUseCase: UpdateProjectUseCase) { }

  async handle(request: Request<IUpdateProjectRequestParams, any, IUpdateProjectRequestBody>, response: Response) {
    const { id } = request.params;
    const { name, description } = request.body;

    try {
      const project = await this.updateProjectUseCase.execute({ id, name, description });

      if (!project) {
        return response.status(404).json({ error: "Project not found" });
      }

      return response.json(project);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
