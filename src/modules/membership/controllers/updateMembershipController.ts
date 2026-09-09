import type { Request, Response } from "express";
import type { UpdateMembershipUseCase } from "../useCases/updateMembershipUseCase";
import type { IUpdateMembershipRequestParams } from "./interfaces/IUpdateMembershipRequestParams";
import type { IUpdateMembershipRequestBody } from "./interfaces/IUpdateMembershipRequestBody";

export class UpdateMembershipController {
  constructor(private readonly updateMembershipUseCase: UpdateMembershipUseCase) { }

  async handle(request: Request<IUpdateMembershipRequestParams, any, IUpdateMembershipRequestBody>, response: Response) {
    const { organizationId, userId } = request.params;
    const { role } = request.body;

    try {
      const membership = await this.updateMembershipUseCase.execute({ organizationId, userId, role });

      if (!membership) {
        return response.status(404).json({ error: "Membership not found" });
      }

      return response.json(membership);
    } catch (error: any) {
      if (error.message === "Membership not found") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
