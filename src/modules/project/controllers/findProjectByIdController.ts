import type { Request, Response } from "express";
import type { FindProjectByIdUseCase } from "../useCases/findProjectByIdUseCase";
import type { IFindProjectByIdRequest } from "./interfaces/IFindProjectByIdRequest";

export class FindProjectByIdController {
  constructor(private readonly findProjectByIdUseCase: FindProjectByIdUseCase) { }

  async handle(request: Request<any, any, IFindProjectByIdRequest>, response: Response) {
    const { id } = request.params;
    const requesterUserId = request.userId!;

    try {
      const project = await this.findProjectByIdUseCase.execute({ id, requesterUserId });

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
