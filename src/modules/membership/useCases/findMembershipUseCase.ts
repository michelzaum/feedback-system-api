import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMembership } from "../interfaces/IMembership";

export class FindMembershipUseCase extends BaseUseCase<{ organizationId: string; userId: string; requesterUserId: string }, IMembership | null> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal({ organizationId, userId, requesterUserId }: { organizationId: string; userId: string; requesterUserId: string }): Promise<IMembership | null> {
    return await this.membershipRepository.findMembership(organizationId, userId);
  }
}
