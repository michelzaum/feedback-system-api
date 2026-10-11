import type { Request, Response } from "express";
import type { FindProjectBySlugUseCase } from "../useCases/findProjectBySlugUseCase";
import type { IFindProjectBySlugRequest } from "./interfaces/IFindProjectBySlugRequest";

export class FindProjectBySlugController {
  constructor(private readonly findProjectBySlugUseCase: FindProjectBySlugUseCase) { }

  async handle(request: Request<any, any, IFindProjectBySlugRequest>, response: Response) {
    const { organizationId, slug } = request.params;
    const requesterUserId = request.userId!;

    try {
      const project = await this.findProjectBySlugUseCase.execute({ organizationId, slug, requesterUserId });

      if (!project) {
        return response.status(404).json({ error: "Project not found" });
      }

      return response.json(project);
    } catch (error: any) {
      if (error.message === "Only organization members can view projects") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
