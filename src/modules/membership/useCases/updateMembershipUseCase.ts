import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateMembership } from "../interfaces/IUpdateMembership";
import type { IMembership } from "../interfaces/IMembership";

export class UpdateMembershipUseCase implements IUseCase<IUpdateMembership, IMembership | undefined> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: IUpdateMembership): Promise<IMembership | undefined> {
    if (data.requesterUserId === data.userId) {
      throw new Error("Cannot update own membership");
    }

    const requesterMembership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins can update memberships");
    }

    const membershipExists = await this.membershipRepository.findMembership(
      data.organizationId,
      data.userId,
    );

    if (!membershipExists) {
      throw new Error("Membership not found");
    }

    return await this.membershipRepository.update(
      data.organizationId,
      data.userId,
      { role: data.role },
    );
  }
}
