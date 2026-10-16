import type { Request, Response } from "express";
import type { FindMembershipUseCase } from "../useCases/findMembershipUseCase";
import type { IFindMembershipRequestParams } from "./interfaces/IFindMembershipRequest";

export class FindMembershipController {
  constructor(private readonly findMembershipUseCase: FindMembershipUseCase) { }

  async handle(request: Request<any, any, IFindMembershipRequestParams>, response: Response) {
    const { organizationId, userId } = request.params;
    const requesterUserId = request.userId!;

    try {
      const membership = await this.findMembershipUseCase.execute({ organizationId, userId, requesterUserId });

      if (!membership) {
        return response.status(404).json({ error: "Membership not found" });
      }

      return response.json(membership);
    } catch (error: any) {
      if (error.message === "Only admins can view membership") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
