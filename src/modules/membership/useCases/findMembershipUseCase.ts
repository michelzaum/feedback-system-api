import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindMembership } from "../interfaces/IFindMembership";
import type { IMembership } from "../interfaces/IMembership";

export class FindMembershipUseCase implements IUseCase<IFindMembership, IMembership | null> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: IFindMembership): Promise<IMembership | null> {
    const requesterMembership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins can view membership");
    }

    return await this.membershipRepository.findMembership(data.organizationId, data.userId);
  }
}
