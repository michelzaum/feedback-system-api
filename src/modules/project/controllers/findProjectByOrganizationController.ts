import type { Request, Response } from "express";
import type { FindProjectByOrganizationUseCase } from "../useCases/findProjectByOrganizationUseCase";
import type { IFindProjectByOrganizationRequest } from "./interfaces/IFindProjectByOrganizationRequest";

export class FindProjectByOrganizationController {
  constructor(private readonly findProjectByOrganizationUseCase: FindProjectByOrganizationUseCase) { }

  async handle(request: Request<any, any, IFindProjectByOrganizationRequest>, response: Response) {
    const { organizationId } = request.params;

    try {
      const projects = await this.findProjectByOrganizationUseCase.execute({ organizationId });
      return response.json(projects);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
