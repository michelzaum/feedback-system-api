import type { Request, Response } from "express";
import type { DeleteMembershipUseCase } from "../useCases/deleteMembershipUseCase";
import type { IDeleteMembershipRequestParams } from "./interfaces/IDeleteMembershipRequest";

export class DeleteMembershipController {
  constructor(private readonly deleteMembershipUseCase: DeleteMembershipUseCase) { }

  async handle(request: Request<any, any, IDeleteMembershipRequestParams>, response: Response) {
    const { organizationId, userId } = request.params;
    const requesterUserId = request.userId!;

    try {
      await this.deleteMembershipUseCase.execute({ organizationId, userId, requesterUserId });

      return response.status(204).send();
    } catch (error: any) {
      if (error.message === "Membership not found") {
        return response.status(404).json({ error: error.message });
      }
      if (error.message === "Only admins can delete memberships") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
