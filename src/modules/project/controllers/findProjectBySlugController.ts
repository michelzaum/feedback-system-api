import type { Request, Response } from "express";
import type { FindProjectBySlugUseCase } from "../useCases/findProjectBySlugUseCase";
import type { IFindProjectBySlugRequest } from "./interfaces/IFindProjectBySlugRequest";

export class FindProjectBySlugController {
  constructor(private readonly findProjectBySlugUseCase: FindProjectBySlugUseCase) { }

  async handle(request: Request<any, any, IFindProjectBySlugRequest>, response: Response) {
    const { organizationId, slug } = request.params;

    try {
      const project = await this.findProjectBySlugUseCase.execute({ organizationId, slug });

      if (!project) {
        return response.status(404).json({ error: "Project not found" });
      }

      return response.json(project);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
