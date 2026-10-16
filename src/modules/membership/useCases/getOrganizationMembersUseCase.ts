import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMember } from "../interfaces/IMember";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";

interface IGetOrganizationMembersInput {
  organizationId: string;
  requesterUserId: string;
}

export class GetOrganizationMembersUseCase implements IUseCase<IGetOrganizationMembersInput, IMember[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: IGetOrganizationMembersInput): Promise<IMember[]> {
    const requesterMembership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins can view organization members");
    }

    return await this.membershipRepository.findManyByOrganizationId(data.organizationId);
  }
}
