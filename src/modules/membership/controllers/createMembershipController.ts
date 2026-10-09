import type { Request, Response } from 'express';
import type { CreateMembershipUseCase } from "../useCases/createMembershipUseCase";
import type { ICreateMembershipRequestParams, ICreateMembershipRequestBody } from './interfaces/ICreateMembershipRequest';

export class CreateMembershipController {
  constructor(private readonly createMembershipUseCase: CreateMembershipUseCase) { }

  async handle(request: Request<ICreateMembershipRequestParams, any, ICreateMembershipRequestBody>, response: Response) {
    const { organizationId } = request.params;
    const { userId, role } = request.body;
    const requesterUserId = request.userId!;

    if (!organizationId) {
      return response.status(400).json({ error: "organizationId is required" });
    }

    try {
      const membership = await this.createMembershipUseCase.execute({ organizationId, userId, requesterUserId, role });
      return response.status(201).json(membership);
    } catch (error: any) {
      if (error.message === "Only admins can create memberships") {
        return response.status(403).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
