import type { Request, Response } from "express";
import type { GetOrganizationMembersUseCase } from "../useCases/getOrganizationMembersUseCase";
import type { IGetOrganizationMembersRequest } from "./interfaces/IGetOrganizationMembersRequest";

export class GetOrganizationMembersController {
  constructor(private readonly getOrganizationMembersUseCase: GetOrganizationMembersUseCase) { }

  async handle(request: Request<any, any, IGetOrganizationMembersRequest>, response: Response) {
    const { organizationId } = request.params;
    const requesterUserId = request.userId!;

    try {
      const members = await this.getOrganizationMembersUseCase.execute({ organizationId, requesterUserId });

      return response.json(members);
    } catch (error: any) {
      if (error.message === "Only admins can view organization members") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}