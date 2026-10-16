import type { Request, Response } from "express";
import type { FindProjectByOrganizationUseCase } from "../useCases/findProjectByOrganizationUseCase";
import type { IFindProjectByOrganizationRequest } from "./interfaces/IFindProjectByOrganizationRequest";

export class FindProjectByOrganizationController {
  constructor(private readonly findProjectByOrganizationUseCase: FindProjectByOrganizationUseCase) { }

  async handle(request: Request<any, any, IFindProjectByOrganizationRequest>, response: Response) {
    const { organizationId } = request.params;
    const requesterUserId = request.userId!;

    try {
      const projects = await this.findProjectByOrganizationUseCase.execute({ organizationId, requesterUserId });
      return response.json(projects);
    } catch (error: any) {
      if (error.message === "Only organization members can view projects") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
