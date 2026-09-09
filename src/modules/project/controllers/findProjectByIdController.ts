import type { Request, Response } from "express";
import type { FindProjectByIdUseCase } from "../useCases/findProjectByIdUseCase";
import type { IFindProjectByIdRequest } from "./interfaces/IFindProjectByIdRequest";

export class FindProjectByIdController {
  constructor(private readonly findProjectByIdUseCase: FindProjectByIdUseCase) { }

  async handle(request: Request<any, any, IFindProjectByIdRequest>, response: Response) {
    const { id } = request.params;

    try {
      const project = await this.findProjectByIdUseCase.execute({ id });

      if (!project) {
        return response.status(404).json({ error: "Project not found" });
      }

      return response.json(project);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
