import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMyOrganization } from "../interfaces/IMyOrganization";

export class FindMyOrganizationsUseCase extends BaseUseCase<{ userId: string }, IMyOrganization[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal({ userId }: { userId: string }): Promise<IMyOrganization[]> {
    return await this.membershipRepository.findManyByUserId(userId);
  }
}
