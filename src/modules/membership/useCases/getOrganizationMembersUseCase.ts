import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMembersFromOrganization } from "../interfaces/IMembersFromOrganization";

export class GetOrganizationMembersUseCase extends BaseUseCase<{ organizationId: string; requesterUserId: string }, IMembersFromOrganization[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal({ organizationId, requesterUserId }: { organizationId: string; requesterUserId: string }): Promise<IMembersFromOrganization[]> {
    return await this.membershipRepository.findManyMembersByOrganizationIds([organizationId]);
  }
}
