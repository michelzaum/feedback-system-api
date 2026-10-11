import type { Request, Response } from "express";
import type { UpdateMembershipUseCase } from "../useCases/updateMembershipUseCase";
import type { IUpdateMembershipRequestParams } from "./interfaces/IUpdateMembershipRequestParams";
import type { IUpdateMembershipRequestBody } from "./interfaces/IUpdateMembershipRequestBody";

export class UpdateMembershipController {
  constructor(private readonly updateMembershipUseCase: UpdateMembershipUseCase) { }

  async handle(request: Request<IUpdateMembershipRequestParams, any, IUpdateMembershipRequestBody>, response: Response) {
    const { organizationId, userId } = request.params;
    const { role } = request.body;
    const requesterUserId = request.userId!;

    try {
      const membership = await this.updateMembershipUseCase.execute({ organizationId, userId, requesterUserId, role });

      if (!membership) {
        return response.status(404).json({ error: "Membership not found" });
      }

      return response.json(membership);
    } catch (error: any) {
      if (error.message === "Membership not found") {
        return response.status(404).json({ error: error.message });
      }
      if (error.message === "Cannot update own membership" || error.message === "Only admins can update memberships") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
