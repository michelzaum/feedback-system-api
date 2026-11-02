import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMembersFromOrganization } from "../interfaces/IMembersFromOrganization";

export class FindMyOrganizationsMembersUseCase extends BaseUseCase<{ userId: string }, IMembersFromOrganization[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal({ userId }: { userId: string }): Promise<IMembersFromOrganization[]> {
    return await this.membershipRepository.findManyMembersByOrganizationIds([userId]);
  }
}
