import type { Request, Response } from "express";
import type { FindMyOrganizationsMembersUseCase } from "../useCases/findMyOrganizationsMembersUseCase";
import type { IFindMyOrganizationsMembersRequest } from "./interfaces/IFindMyOrganizationsMembersRequest";

export class FindMyOrganizationsMembersController {
  constructor(private readonly findMyOrganizationsMembersUseCase: FindMyOrganizationsMembersUseCase) { }

  async handle(request: Request<any, any, IFindMyOrganizationsMembersRequest>, response: Response) {
    const userId = request.userId;

    if (!userId) {
      return response.status(400).json({ error: "User ID is required" });
    }

    try {
      const members = await this.findMyOrganizationsMembersUseCase.execute({ userId });
      return response.json(members);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
