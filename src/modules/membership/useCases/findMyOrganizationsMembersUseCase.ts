import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMembersFromOrganization } from "../interfaces/IMembersFromOrganization";

export class FindMyOrganizationsMembersUseCase implements IUseCase<{ userId: string }, IMembersFromOrganization[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: { userId: string }): Promise<IMembersFromOrganization[]> {
    const organizations = await this.membershipRepository.findManyByUserId(data.userId);
    const organizationIds = organizations.map((org) => org.id);

    if (organizationIds.length === 0) {
      return [];
    }

    return await this.membershipRepository.findManyMembersByOrganizationIds(organizationIds);
  }
}
