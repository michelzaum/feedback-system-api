import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteMembership } from "../interfaces/IDeleteMembership";
import type { IMembership } from "../interfaces/IMembership";

export class DeleteMembershipUseCase extends BaseUseCase<IDeleteMembership, void> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal(data: IDeleteMembership): Promise<void> {
    await this.membershipRepository.delete(data.organizationId, data.userId);
  }
}
