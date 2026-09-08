import type { Request, Response } from "express";
import type { GetOrganizationMembersUseCase } from "../useCases/getOrganizationMembersUseCase";
import type { IGetOrganizationMembersRequest } from "./interfaces/IGetOrganizationMembersRequest";

export class GetOrganizationMembersController {
  constructor(private readonly getOrganizationMembersUseCase: GetOrganizationMembersUseCase) { }

  async handle(request: Request<any, any, IGetOrganizationMembersRequest>, response: Response) {
    const { organizationId } = request.params;

    try {
      const members = await this.getOrganizationMembersUseCase.execute({ organizationId });

      return response.json(members);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}