import type { Request, Response } from "express";
import type { FindMyOrganizationsUseCase } from "../useCases/findMyOrganizationsUseCase";
import type { IFindMyOrganizationsRequest } from "./interfaces/IFindMyOrganizationsRequest";

export class FindMyOrganizationsController {
  constructor(private readonly findMyOrganizationsUseCase: FindMyOrganizationsUseCase) { }

  async handle(request: Request<any, any, IFindMyOrganizationsRequest>, response: Response) {
    const userId = request.userId;

    if (!userId) {
      return response.status(400).json({ error: "User ID is required" });
    }

    try {
      const organizations = await this.findMyOrganizationsUseCase.execute({ userId });
      return response.json(organizations);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
