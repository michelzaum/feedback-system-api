import type { Request, Response } from "express";
import type { FindProjectBySlugsUseCase } from "../useCases/findProjectBySlugsUseCase";
import type { IFindProjectBySlugsRequest } from "./interfaces/IFindProjectBySlugsRequest";

export class FindProjectBySlugsController {
  constructor(private readonly findProjectBySlugsUseCase: FindProjectBySlugsUseCase) { }

  async handle(request: Request<any, any, IFindProjectBySlugsRequest>, response: Response) {
    const { organizationSlug, projectSlug } = request.params;

    try {
      const project = await this.findProjectBySlugsUseCase.execute({ organizationSlug, projectSlug });

      if (!project) {
        return response.status(404).json({ error: "Project not found" });
      }

      return response.json(project);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
