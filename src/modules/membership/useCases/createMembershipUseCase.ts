import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateMembership } from "../interfaces/ICreateMembership";
import type { IMembership } from "../interfaces/IMembership";

export class CreateMembershipUseCase extends BaseUseCase<ICreateMembership, IMembership> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal(data: ICreateMembership): Promise<IMembership> {
    const requesterMembership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins can create memberships");
    }

    const membershipExists = await this.membershipRepository.findMembership(
      data.organizationId,
      data.userId,
    );

    if (membershipExists) {
      throw new Error("Membership already exists");
    }

    return await this.membershipRepository.create({
      organizationId: data.organizationId,
      userId: data.userId,
      role: data.role,
    });
  }
}
